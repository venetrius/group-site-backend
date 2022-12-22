const express       = require('express');
const topicRoutes  = express.Router();
const { responseHandler, listResponseHandler } = require('./helpers/response')


module.exports = function(DataHelpers) {

  topicRoutes.get('/:topic/', function(req, res){
    const topicId = parseInt(req.params.topic)
    DataHelpers.topics.getTopic(topicId, responseHandler(res, 200))
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