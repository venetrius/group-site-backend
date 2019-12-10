"use strict";

const express       = require('express');
const projectRoutes  = express.Router();



//==============================================
//         HELPER FUNCTIONS
//==============================================

// TODO maybe general cb
const getPostCallback = function(res){
  const postCallback = function(err, result){
    if(err){
      console.log({error})
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
    const project = req.body
    project.selected_stack = project.selected_stack.toString()
    DataHelpers.projects_helpers.addProject(getPostCallback(res), project)
  })
  
  projectRoutes.post('/:project/comments', function(req,res){
    let comment = req.body
    comment.project_id = req.params.project
    DataHelpers.comments.addComment(getPostCallback(res), comment)
  })

  projectRoutes.get('/:project/comments/', function(req,res){
    const project_id = req.params.project
    DataHelpers.comments.getComments(getPostCallback(res), project_id)
  })

  return projectRoutes;
};