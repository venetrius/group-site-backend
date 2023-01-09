exports.up = function(knex, Promise) {
    return knex.schema.table('comments', function(table) {
      table.string('parent_entity', 'project').notNull().default('project')
      table.renameColumn('project_id', 'foregin_key')
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.table('comments', function(table) {
      table.renameColumn('foregin_key', 'project_id')
      table.dropColumn('parent_entity');
    })
  }
