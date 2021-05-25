require('dotenv').config();

let knex

if (process.env.NODE_ENV === 'developmentPg'){
  knex = require('knex')({
    client: 'pg',
    options: {
      connection:  {
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME,
        port     : process.env.DB_PORT,
        ssl      : process.env.DB_SSL
      }
    }
  })
} else if(process.env.NODE_ENV === 'development') {
  knex = require('knex')({
    client: 'sqlite3',
    connection: () => ({
      filename: './dev.sqlite3'
    }),
    useNullAsDefault: true
  });
} else {
  knex = require('knex')({
    client: 'pg',
    options: {
      connection: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    }
});
}

const dataHelpers = {}
dataHelpers. projects_helpers = require('./data-helpers-projects')(knex),
dataHelpers.comments          = require('./comments')(knex)
dataHelpers.users             = require('./users')(knex)
dataHelpers.events             = require('./data-helpers-events')(knex)

module.exports = dataHelpers;
