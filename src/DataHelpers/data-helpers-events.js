module.exports = function(knex){

    function getEvents(cb) {
      knex.select('*').from('events')
        .asCallback(function(err, events) {
          if (err) {
            cb(err);
          }
          cb(null, events)
        });
    }

    function getEvent(eventId, cb) {
      knex.select('*').from('events')
        .where('id', eventId)
        .asCallback(function(err, event) {
          if (err) {
            cb(err);
          }
          cb(null, event[0])
        });
    }

    return {
      getEvents,
      getEvent
    }

  }
