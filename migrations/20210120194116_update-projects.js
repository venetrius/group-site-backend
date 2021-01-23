exports.up = function(knex, Promise) {
  return knex.schema.table('projects', function(table) {
    table.string('summary')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('projects', function(table) {
    table.dropColumn('summary');
  });
};
