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
                events[0].users = users
                cb(null, events[0])
              }
            })
          }
        });
    }

    function registerUserForEvent(eventId, userId, cb) {
      knex('events_users')
      .insert({event_id: eventId, user_id: userId})
      .returning('*')
      .asCallback(function(err, eventUser) {
          if (err) {
            cb(err);
          }
          getUsersForEvent(eventId, cb)
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

    return {
      getEvents,
      getEvent,
      getUsersForEvent,
      registerUserForEvent
    }

  }
