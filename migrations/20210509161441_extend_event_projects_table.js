
exports.up = function(knex, Promise) {
    return knex.schema.table('events_projects', function(table) {
      table.integer('created_by')
      table.timestamp('created_at').defaultTo(knex.fn.now())
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('events_projects', function(table) {
      table.dropColumn('created_by');
      table.dropColumn('created_at');
    });
  };
  