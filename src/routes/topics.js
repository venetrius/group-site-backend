const express       = require('express');
const topicRoutes  = express.Router();
const { Unauthorized, BadRequest } = require('../utils/errors/index')
const responseHelper = require('./helpers/response')

module.exports = function(DataHelpers) {
  const getCommentForTopicCb = res => {
    const getCommentsForTopic = (err, topic) => {
      if(err){
        console.log('getCommentsForTopic', {err})
        return handleError(res, err)
      }
      const finishRequestCb = (error, comments) => {
        if(error){
          console.log('finishRequestCb', {err, comments})
          return handleError(res, err)
        } else{
          res.status(200).send(JSON.stringify({ topic, comments }))
        }
      }
      DataHelpers.comments.getComments(finishRequestCb, topic.id, 'topic')
    }
    return getCommentsForTopic
  }

  topicRoutes.get('/:topic/', function(req, res){
    const topicId = parseInt(req.params.topic)
    DataHelpers.topics.getTopic(topicId, getCommentForTopicCb(res))

  })

  topicRoutes.get("/", function(req, res){
    DataHelpers.topics.getTopics(function(err, topics){
      if(err){
        res.status(404).send('wrong request');
      }
      else{
        res.status(200).send(JSON.stringify(topics))
      }
    })
  })

  topicRoutes.post('/', function(req,res){
    if (!req.user) {
      res.status(403).json({ error: "Unauthorized" });
      return
    }
    const topic = req.body
    topic.created_at = new Date().toISOString();
    topic.created_by = req.user.id
    DataHelpers.topics.addTopic(responseHelper(res), topic)
  })

  topicRoutes.post('/:topic/comments', function(req,res){
    if (!req.user) {
      res.status(403).json({ error: "Unauthorized" });
      return
    }
    let comment = req.body
    comment.user_id = req.user.id
    comment.foregin_key = req.params.topic
    comment.parent_entity = 'topic'
    comment.created_at = new Date().toISOString();
    DataHelpers.comments.addComment(responseHelper(res), comment)
  })

//   const registerUser = async ({ topicId, user = {} }, cb ) => {
//     const userId = user.id
//     if(!topicId){
//       cb(BadRequest())
//     }
//     if (!userId) {
//       cb(Unauthorized())
//     } else {
//       DataHelpers.topics.registerUserForTopic(topicId, userId, cb)
//     }
//   }

//   const registerProject = async ({ topicId, projectId, user = {} }, cb ) => {
//     const userId = user.id
//     if(!topicId){
//       cb(BadRequest())
//     }
//     if (!userId) {
//       cb(Unauthorized())
//     } else {
//       DataHelpers.topics.registerProjectForTopic(topicId, projectId,userId, cb)
//     }
//   }

//   topicRoutes.post('/:topic/users', function(req, res){
//     const data = {
//       topicId: parseInt(req.params.topic),
//       user: req.user
//     }
//     registerUser(data, responseHelper(res))
//   })

//   topicRoutes.post('/:topic/projects', function(req, res){
//     const  { projectId } = req.body
//     const data = {
//       topicId: parseInt(req.params.topic),
//       user: req.user,
//       projectId
//     }
//     registerProject(data, responseHelper(res))
//   })

  return topicRoutes;
};
