module.exports = function(knex){
    function getComments(cb, project_id) {
      knex.select('*').from('comments')
        .where('project_id', project_id)
        .asCallback(function(err, comments) {
          if (err) {
            return cb(err);
          }
          cb(null, comments)
        });
    }

    function addComment(cb, comment) {
      knex('comments')
      .insert(comment)
      .returning('*')
      .asCallback(function(err, comments) {
          if (err) {
            cb(err);
          }
          cb(null, comments)
        });
    }

    return {
      getComments,
      addComment
    }
  }
