
exports.up = function(knex) {
  return knex.schema.createTable(
    "comments"
    , function (table) {
      table.increments('id')
      table.string('project_id')
      table.string('user_id')
      table.string('comment')
      table.timestamps()
    }
  )
}

exports.down = function(knex) {
  return knex.schema.dropTable("comments")
};
