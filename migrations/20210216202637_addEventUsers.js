
exports.up = function(knex) {
  return knex.schema.createTable("events_users", function (table) {
    table.increments('id')
    table.bigInteger('event_id')
    table.bigInteger('user_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("events_users")
};
