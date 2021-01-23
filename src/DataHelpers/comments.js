module.exports = function(knex){
    function getComments(cb, project_id) {
      knex('comments')
      .join('users', 'users.id', 'comments.user_id')
      .select('comments.id', 'users.display_name', 'users.photo', 'comments.comment', 'comments.created_at')
      .where('project_id', project_id)
        .asCallback(cb);
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
