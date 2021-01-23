module.exports = function(knex){

  function getUserById(userId, cb) {
    knex.select('*').from('users')
      .where('id', userId)
      .asCallback( (err , users = []) => cb(err, users[0]))
  }

  function getUserByToken(token, cb) {
    knex.select('*').from('users')
      .where('token', token)
      .asCallback( (err , users = []) => cb(err, users[0]))
  }

  function createUser(data, cb) {
    knex('users')
    .insert(data)
    .returning('*')
    .asCallback(cb)
  }

  return {
    getUserById,
    createUser,
    getUserByToken
  }
}
