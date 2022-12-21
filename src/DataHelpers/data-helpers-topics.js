module.exports = function (knex) {

  function getTopics(cb) {
    knex.select('*').from('topics')
      .asCallback(cb);
  }

  function getTopic(topicId, cb) {
    knex.select('*').from('topics')
      .where('id', topicId)
      .asCallback((err, res) => cb(err, (res || [])[0]));
  }
  function addTopic(cb, topic) {
    knex('topics')
      .insert(topic)
      .returning('*')
      .asCallback(cb);
  }

  return {
    getTopics,
    getTopic,
    addTopic
  }

}