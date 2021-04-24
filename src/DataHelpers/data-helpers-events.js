const {
  NotFoundError,
} = require('../utils/errors/index')

module.exports = function(knex){

    function getEvents(cb) {
      knex.select('*').from('events')
        .asCallback(function(err, events) {
          if (err) {
            cb(err);
          } else {
            cb(null, events)
          }
        });
    }

    function getEvent(eventId, cb) {
      knex.select('*').from('events')
        .where('id', eventId)
        .asCallback(function(err, events) {
          if (err) {
            cb(err);
          }
          else if(!events.length) {
            cb('not found')
          } else {
            getUsersForEvent(eventId, function(error, users){
              if (error) {
                cb(error);
              } else {
                getProjectsForEvent(eventId, function(error, projects){
                  if (error) {
                    cb(error);
                  } else {
                    events[0].users = users
                    events[0].projects = projects
                    cb(null, events[0])
                  }
                })
              }
            })
          }
        });
    }

    const isEventExist = async id => (await (knex.select('*').from('events').where({ id }).where('date', '>', new Date()))).length
    const isProjectExist = async id => (await (knex.select('*').from('projects').where({ id }))).length


    const isEventUserExist = async (event_id, user_id) =>
      (await knex.select('*').from('events_users').where({ event_id, user_id })).length

    const isEventProjectExist = async (event_id, project_id) =>
      (await knex.select('*').from('events_projects').where({ event_id, project_id })).length


    async function registerUserForEvent(eventId, userId, cb) {
      const eventExist = await isEventExist(eventId)
      if(!eventExist) {
        return cb(NotFoundError())
      }
      const eventUserExist = await isEventUserExist(eventId, userId)

      if (eventUserExist) {
        console.log({eventUserExist})
        return getUsersForEvent(eventId, cb)
      }
      knex('events_users')
      .insert({event_id: eventId, user_id: userId})
      .returning('*')
      .asCallback(function(err) {
          if (err) {
            cb(err);
          }
          getUsersForEvent(eventId, cb)
        });
    }

    async function registerProjectForEvent(eventId, projectId, cb) {
      const eventExist = await isEventExist(eventId)
      const projectExist = await isProjectExist(projectId)

      if(!eventExist || !projectExist) {
        return cb(NotFoundError())
      }

      const eventProjectExist = await isEventProjectExist(eventId, projectId)

      if (eventProjectExist) {
        return getProjectsForEvent(eventId, cb)
      }

      knex('events_projects')
      .insert({event_id: eventId, project_id: projectId})
      .returning('*')
      .asCallback(function(err) {
          if (err) {
            cb(err);
          }
          getProjectsForEvent(eventId, cb)
        });
    }

    function getUsersForEvent(eventId, cb) {
      knex('events_users')
      .join('users', 'events_users.user_id', '=', 'users.id')
      .where('events_users.event_id', eventId)
      .asCallback(function(err, user_ids) {
        if (err) {
          cb(err);
        } else {
          cb(null, user_ids)
        }
      });
    }

    function getProjectsForEvent(eventId, cb) {
      knex('events_projects')
      .join('projects', 'events_projects.project_id', '=', 'projects.id')
      .where('events_projects.event_id', eventId)
      .asCallback(function(err, projects) {
        if (err) {
          cb(err);
        } else {
          cb(null, projects)
        }
      });
    }

    return {
      getEvents,
      getEvent,
      getUsersForEvent,
      registerProjectForEvent,
      registerUserForEvent
    }

  }
