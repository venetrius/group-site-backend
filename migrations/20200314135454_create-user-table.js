exports.up = function (knex, Promise) {
  return knex.schema.createTable("users", function (table) {
    table.increments('id')
    table.string('user_name')
    table.string('display_name')
    table.string('photo')
    table.string('token')
  })
};

exports.down = function (knex, Promise) {
return knex.schema.dropTable("users")
};