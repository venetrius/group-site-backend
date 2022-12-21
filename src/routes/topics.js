const express       = require('express');
const topicRoutes  = express.Router();
const responseHelper = require('./helpers/response')

module.exports = function(DataHelpers) {

  topicRoutes.get('/:topic/', function(req, res){
    const topicId = parseInt(req.params.topic)
    DataHelpers.topics.getTopic(topicId, function(err, topic){
      if(err){
        res.status(404).send('wrong request');
      }
      else{
        res.status(200).send(JSON.stringify(topic))
      }
    })
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

  return topicRoutes;
};