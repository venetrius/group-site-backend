const express       = require('express');
const eventRoutes  = express.Router();
const { Unauthorized, BadRequest } = require('../utils/errors/index')

const getCallback = res => {
  return function(err, success = {} ) {
    const { status = 200, message } = success
    if(err) {
      const errorCode = err.status || 500
      const errorMessage = err.message || 'internal error'
      res.status(errorCode).send(errorMessage);
    } else {
      res.status(status).send(JSON.stringify(message))
    }
  }
}

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
      DataHelpers.events.registerUserForEvent(eventId, userId, function(err, result){
        if (err) {
          cb(err)
        } else {
          cb(null, { status: 201,  message:result })
        }
      })
    }

  }

  eventRoutes.post('/:event/users', function(req, res){
    const data = {
      eventId: parseInt(req.params.event),
      user: req.user
    }
    registerUser(data, getCallback(res))
  })

  return eventRoutes;
};
