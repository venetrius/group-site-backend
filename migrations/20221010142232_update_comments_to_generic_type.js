
exports.up = function(knex, Promise) {
  return knex.schema.table('comments', function(table) {
    table.text('parent_entity')
    table.integer('foregin_key')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('comments', function(table) {
    table.dropColumn('parent_entity');
    table.dropColumn('foregin_key');
  });
};
