
exports.up = async function(knex, Promise) {
  // await knex.schema.alterTable('comments', function(table) {
  //     table.integer('user_id').alter();
  // });
}

exports.down = async function(knex, Promise) {
  // await knex.schema.alterTable('comments', function(table) {
  //   table.string('user_id').alter();
  // });
}
