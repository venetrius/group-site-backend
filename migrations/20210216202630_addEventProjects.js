
exports.up = function(knex) {
  return knex.schema.createTable("events_projects", function (table) {
    table.increments('id')
    table.bigInteger('event_id')
    table.bigInteger('project_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("events_projects")
};
