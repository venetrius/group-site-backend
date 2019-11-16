"use strict";

const express       = require('express');
const projectRoutes  = express.Router();



//==============================================
//         HELPER FUNCTIONS
//==============================================

const getPostCallback = function(res){
  const postCallback = function(err, result){
    console.log("callback", err, result)
    if(err){
      res.status(404).send('error');
    }
    res.status(201).send(result);
  }
  return postCallback
}


//==============================================
//         PROJECT ROUTES
//==============================================
module.exports = function(DataHelpers) {

  projectRoutes.get("/", function(req, res){
    DataHelpers.projects_helpers.getProjects(function(err, projects){
      if(err){
        res.status(404).send('wrong request');
      }
      else{
        res.status(200).send(JSON.stringify(projects))
      }
    })

  })

  projectRoutes.post('/', function(req,res){
    console.log('received post request', req.body)
   /* DataHelpers.projects_helpers.addProject(getPostCallback(res), 
    {"name":"something cool",
    "description":"better than the previous",
    "stack":"node.js,react.js,psql"})*/
    res.status(201).send('ok');

  })  
  return projectRoutes;
};