"use strict";

const express       = require('express');
const projectRoutes  = express.Router();



//==============================================
//         HELPER FUNCTIONS
//==============================================

const getSendJSOnonSuccess = function(res){
  let  sendJSOnonSuccess = function(err, point){
    if(err){
      res.status(404).send();
    }else{
      res.json(point);
    }  
  }
  return sendJSOnonSuccess
}

const isAuthorized = function(req){
  let userID = req.session.user_id;
  let userName = req.session.user_name;
  return (userID && userName);
}
//==============================================
//         PROJECT ROUTES
//==============================================
module.exports = function(DataHelpers) {

  projectRoutes.get("/", function(req, res){
    res.status(201).send(JSON.stringify({items : [{message : "nothing to show"}]}));
  })

  
  return projectRoutes;
};