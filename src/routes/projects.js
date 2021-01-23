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
      console.log({err})
      res.status(404).send('error');
    }
    res.status(201).send(result);
  }
  return postCallback
}

const handleError = (res, err) => {
  console.log({err})
  res.status(500).send('Unexpected error'); // TODO
}

//==============================================
//         PROJECT ROUTES
//==============================================
module.exports = function(DataHelpers) {
  const getCommentForProjectCb = res => {
    const getCommentsForProject = (err, project) => {
      if(err){
        return handleError(res, err)
      }
      const finishRequestCb = (error, comments) => {
        if(error){
          return handleError(res, err)
        } else{
          res.status(200).send(JSON.stringify({ project, comments }))
        }
      }
      DataHelpers.comments.getComments(finishRequestCb, project[0].id)
    }
    return getCommentsForProject
  }

  projectRoutes.get('/:project/', function(req,res){
    const project_id = req.params.project
    DataHelpers.projects_helpers.getProject(project_id, getCommentForProjectCb(res))
  })

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
    if (!req.user) {
      res.status(403).json({ error: "Unauthorized" });
      return
    }
    const project = req.body
    project.selected_stack = project.selected_stack.toString()
    project.created_at = new Date().toISOString();
    project.created_by = req.user.id
    DataHelpers.projects_helpers.addProject(getPostCallback(res), project)
  })

  projectRoutes.post('/:project/comments', function(req,res){
    if (!req.user) {
      res.status(403).json({ error: "Unauthorized" });
      return
    }
    let comment = req.body
    comment.user_id = req.user.id
    comment.project_id = req.params.project
    comment.created_at = new Date().toISOString();
    DataHelpers.comments.addComment(getPostCallback(res), comment)
  })

  projectRoutes.get('/:project/comments/', function(req,res){
    const project_id = req.params.project
    DataHelpers.comments.getComments(getPostCallback(res), project_id)
  })

  return projectRoutes;
};
