exports.up = function(knex) {
  return knex.schema.createTable(
    "resource_relations"
    , function (table) {
      table.increments('id')
      table.integer('created_by')
      table.integer('resource_id').unsigned()
      table.foreign('resource_id').references('resources.id')
      table.string('entity_type')
      table.integer('entity_id')
      table.timestamps()
    }
  )
}

exports.down = function(knex) {
  return knex.schema.dropTable("resource_relations")
};