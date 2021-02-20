"use strict";

const express       = require('express');
const eventRoutes  = express.Router();


//==============================================
//         EVENT ROUTES
//==============================================
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
      else{
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

  eventRoutes.post('/:event/users', function(req,res){
    const eventId = parseInt(req.params.event)
    if(!eventId){
      return res.status(404).send('wrong request');
    }
    if (!req.user) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    DataHelpers.events.registerUserForEvent(eventId, req.user.id, function(err, result){
      if(err){
        res.status(404).send('wrong request');
      }
      else{
        res.status(200).send(JSON.stringify(result))
      }
    })
  })

  return eventRoutes;
};
