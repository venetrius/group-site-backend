
exports.up = function(knex, Promise) {
  return knex.schema.table('projects', function(table) {
    table.timestamps();
    table.string('difficulty_from')
    table.string('difficulty_to')
    table.string('selected_stack')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('projects', function(table) {
    table.dropColumn('difficulty_from');
    table.dropColumn('difficulty_to');
    table.dropColumn('selected_stack');
  });
};
