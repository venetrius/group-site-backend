const express       = require('express');
const projectRoutes  = express.Router();
const { responseHandler, listResponseHandler } = require('./helpers/response')

const PROJECT_ENTITY = 'project'

const handleError = (res, err) => {
  console.log({err})
  res.status(500).send('Unexpected error'); // TODO
}

module.exports = function(DataHelpers) {
  const getCommentForProjectCb = res => {
    const getCommentsForProject = (err, project) => {
      if(err){
        console.log('getCommentsForProject', {err})
        return handleError(res, err)
      }
      const finishRequestCb = (error, comments) => {
        if(error){
          console.log('finishRequestCb', {err})
          return handleError(res, err)
        } else{
          res.status(200).send(JSON.stringify({ project, comments }))
        }
      }
      DataHelpers.comments.getComments(finishRequestCb, project[0].id, PROJECT_ENTITY)
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
        console.log('projects_helpers', {err})
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
    DataHelpers.projects_helpers.addProject(responseHandler(res), project)
  })

  projectRoutes.post('/:project/comments', function(req,res){
    if (!req.user) {
      res.status(403).json({ error: "Unauthorized" });
      return
    }
    let comment = req.body
    comment.user_id = req.user.id
    comment.foregin_key = req.params.project
    comment.created_at = new Date().toISOString();
    comment.parent_entity = PROJECT_ENTITY
    DataHelpers.comments.addComment(responseHandler(res), comment)
  })

  projectRoutes.get('/:project/comments/', function(req,res){
    const project_id = req.params.project
    DataHelpers.comments.getComments(responseHandler(res, 200), project_id)
  })

  return projectRoutes;
};
