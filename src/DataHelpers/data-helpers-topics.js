const {
  NotFoundError,
} = require('../utils/errors/index')

module.exports = function(knex){

    function getTopics(cb) {
      console.log("getTopics", {cb})
      knex.select('*').from('topics')
        .asCallback(function(err, topics) {
          if (err) {
            cb(err);
          } else {
            cb(null, topics)
          }
        });
    }

    function getTopic(topicId, cb) {
      knex.select('*').from('topics')
        .where('id', topicId)
        .asCallback(function(err, topics) {
          console.log()
          if (err) {
            cb(err);
          }
          else if(!topics.length) {
            cb('not found')
          } else {
            cb(null, topics[0])
            // getUsersForTopic(topicId, function(error, users){
            //   if (error) {
            //     cb(error);
            //   } else {
            //     getProjectsForTopic(topicId, function(error, projects){
            //       if (error) {
            //         cb(error);
            //       } else {
            //         topics[0].users = users
            //         topics[0].projects = projects
            //         cb(null, topics[0])
            //       }
            //     })
            //   }
            // })
          }
        });
    }

    const isTopicExist = async id => (await (knex.select('*').from('topics').where({ id }).where('date', '>', new Date()))).length
    const isProjectExist = async id => (await (knex.select('*').from('projects').where({ id }))).length


    const isTopicUserExist = async (topic_id, user_id) =>
      (await knex.select('*').from('topics_users').where({ topic_id, user_id })).length

    const isTopicProjectExist = async (topic_id, project_id) =>
      (await knex.select('*').from('topics_projects').where({ topic_id, project_id })).length


    async function registerUserForTopic(topicId, userId, cb) {
      const topicExist = await isTopicExist(topicId)
      if(!topicExist) {
        return cb(NotFoundError())
      }
      const topicUserExist = await isTopicUserExist(topicId, userId)

      if (topicUserExist) {
        console.log({topicUserExist})
        return getUsersForTopic(topicId, cb)
      }
      knex('topics_users')
      .insert({topic_id: topicId, user_id: userId})
      .returning('*')
      .asCallback(function(err) {
          if (err) {
            cb(err);
          }
          getUsersForTopic(topicId, cb)
        });
    }

    async function registerProjectForTopic(topicId, projectId, userId, cb) {
      const topicExist = await isTopicExist(topicId)
      const projectExist = await isProjectExist(projectId)

      if(!topicExist || !projectExist) {
        return cb(NotFoundError())
      }

      const topicProjectExist = await isTopicProjectExist(topicId, projectId)

      if (topicProjectExist) {
        return getProjectsForTopic(topicId, cb)
      }

      knex('topics_projects')
      .insert({topic_id: topicId, project_id: projectId, created_by: userId})
      .returning('*')
      .asCallback(function(err) {
          if (err) {
            cb(err);
          }
          getProjectsForTopic(topicId, cb)
        });
    }

    function getUsersForTopic(topicId, cb) {
      knex('topics_users')
      .join('users', 'topics_users.user_id', '=', 'users.id')
      .select('users.id', 'users.display_name', 'users.photo')
      .where('topics_users.topic_id', topicId)
      .asCallback(function(err, user_ids) {
        if (err) {
          cb(err);
        } else {
          cb(null, user_ids)
        }
      });
    }

    function getProjectsForTopic(topicId, cb) {
      knex('topics_projects')
      .join('projects', 'topics_projects.project_id', '=', 'projects.id')
      .join('users', 'topics_projects.created_by', '=', 'users.id')
      .select('topics_projects.project_id', 'projects.*','users.id as userId', 'users.display_name', 'users.photo')
      .where('topics_projects.topic_id', topicId)
      .asCallback(function(err, projects) {
        if (err) {
          cb(err);
        } else {
          cb(null, projects)
        }
      });
    }

    function addTopic(cb, topic) {
      knex('topics')
      .insert(topic)
      .returning('*')
      .asCallback(function(err, topics) {
          if (err) {
            console.log({err}, 'from add topic')
            cb(err);
          }
          console.log({topics}, 'Res add topic')

          cb(null, topics)
        });
    }

    return {
      getTopics,
      getTopic,
      getUsersForTopic,
      registerProjectForTopic,
      registerUserForTopic,
      addTopic
    }

  }
