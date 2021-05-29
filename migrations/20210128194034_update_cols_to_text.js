exports.up = async function(knex, Promise) {
  // await knex.schema.alterTable('projects', function(table) {
  //     table.string('description').alter();
  //     table.string('comments').alter();
  // });
}

exports.down = async function(knex, Promise) {
  // await knex.schema.alterTable('comments', function(table) {
  //   table.string('user_id').alter();
  // });
}
