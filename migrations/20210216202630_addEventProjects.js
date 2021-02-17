
exports.up = function(knex) {
  return knex.schema.createTable("events_projects", function (table) {
    table.increments('id')
    table.text('event_id')
    table.text('project_id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("events_projects")
};
