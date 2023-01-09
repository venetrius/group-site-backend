exports.up = function(knex) {
  return knex.schema.createTable(
    "resources"
    , function (table) {
      table.increments('id')
      table.string('name')
      table.text('url')
      table.string('type')
      table.integer('created_by')
      table.timestamps()
    }
  )
}

exports.down = function(knex) {
  return knex.schema.dropTable("resources")
};
