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
        .asCallback(function(err, event) {
          if (err) {
            cb(err);
          }
          else if(event.length) {
            cb('not found')
          } else {
            cb(null, event[0])
          }
        });
    }

    return {
      getEvents,
      getEvent
    }

  }
