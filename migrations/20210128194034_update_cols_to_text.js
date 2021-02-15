
exports.up = async function(knex, Promise) {
  await knex.raw(`
  ALTER TABLE projects
  ALTER COLUMN summary  TYPE text;

  ALTER TABLE projects
  ALTER COLUMN description  TYPE text;

  ALTER TABLE comments
  ALTER COLUMN comment  TYPE text;
`);
};

exports.down = function(knex) {};
