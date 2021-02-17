
exports.up = function(knex) {
  return knex.schema.createTable("events_users", function (table) {
    table.increments('id')
    table.text('event_id')
    table.text('user_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("events_users")
};
