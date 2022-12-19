module.exports = function(knex){
    function getComments(cb, entity_id, entity) {
      knex('comments')
      .join('users', 'users.id', 'comments.user_id')
      .select('comments.id', 'users.display_name', 'users.photo', 'comments.comment', 'comments.created_at')
      .where({'foregin_key': Number(entity_id), "parent_entity": entity})
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
