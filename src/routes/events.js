const express       = require('express');
const eventRoutes  = express.Router();
const { Unauthorized, BadRequest } = require('../utils/errors/index')
const responseHelper = require('./helpers/response')

module.exports = function(DataHelpers) {

  eventRoutes.get('/:event/', function(req,res){
    const eventId = parseInt(req.params.event)
    if(!eventId){
      res.status(404).send('wrong request');
      return
    }
    DataHelpers.events.getEvent(eventId, function(err, event){
      if(err || ! event){
        res.status(404).send('wrong request');
      }
      else {
        event.open = Date.parse(event.date) > new Date().getTime()
        res.status(200).send(JSON.stringify(event))
      }
    })
  })

  eventRoutes.get("/", function(req, res){
    DataHelpers.events.getEvents(function(err, events){
      if(err){
        res.status(404).send('wrong request');
      }
      else{
        res.status(200).send(JSON.stringify(events))
      }
    })
  })

  const registerUser = async ({ eventId, user = {} }, cb ) => {
    const userId = user.id
    if(!eventId){
      cb(BadRequest())
    }
    if (!userId) {
      cb(Unauthorized())
    } else {
      DataHelpers.events.registerUserForEvent(eventId, userId, cb)
    }
  }

  const registerProject = async ({ eventId, projectId, user = {} }, cb ) => {
    const userId = user.id
    if(!eventId){
      cb(BadRequest())
    }
    if (!userId) {
      cb(Unauthorized())
    } else {
      DataHelpers.events.registerProjectForEvent(eventId, projectId,userId, cb)
    }
  }

  eventRoutes.post('/:event/users', function(req, res){
    const data = {
      eventId: parseInt(req.params.event),
      user: req.user
    }
    registerUser(data, responseHelper(res))
  })

  eventRoutes.post('/:event/projects', function(req, res){
    const  { projectId } = req.body
    const data = {
      eventId: parseInt(req.params.event),
      user: req.user,
      projectId
    }
    registerProject(data, responseHelper(res))
  })

  return eventRoutes;
};
