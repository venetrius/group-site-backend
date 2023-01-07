const express       = require('express');
const topicRoutes  = express.Router();
const { responseHandler, listResponseHandler } = require('./helpers/response')


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
    DataHelpers.topics.getTopics(listResponseHandler(res, 200))
  })

  topicRoutes.post('/', function(req,res){
    if (!req.user) {
      res.status(403).json({ error: "Unauthorized" });
      return
    }
    const topic = req.body
    topic.created_at = new Date().toISOString();
    topic.created_by = req.user.id
    DataHelpers.topics.addTopic(responseHandler(res), topic)
  })

  return topicRoutes;
};