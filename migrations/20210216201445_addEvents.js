exports.up = function (knex, Promise) {
  return knex.schema.createTable("events", function (table) {
    table.increments('id')
    table.text('name')
    table.text('description')
    table.date('date')
    table.text('location')
    table.text('sponsor')
    table.text('credit')
  })
};

exports.down = function (knex, Promise) {
return knex.schema.dropTable("events")
};
