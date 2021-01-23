exports.up = function(knex, Promise) {
  return knex.schema.table('projects', function(table) {
    table.integer('created_by')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('projects', function(table) {
    table.integer('created_by');
  });
};
