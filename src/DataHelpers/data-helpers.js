require('dotenv').config();

let options

if(process.env.NODE_ENV === 'development'){
  options = {
    connection:  {
      host     : process.env.DB_HOST,
      user     : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME,
      port     : process.env.DB_PORT,
      ssl      : process.env.DB_SSL
    }
  }
}else{
  options = {
    connection: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }
}
const knex = require('knex')({
    client: 'pg',
    ...options
});

const dataHelpers = {}
dataHelpers. projects_helpers = require('./data-helpers-projects')(knex)
dataHelpers.topics = require('./data-helpers-topics')(knex)
dataHelpers.comments          = require('./comments')(knex)
dataHelpers.users             = require('./users')(knex)
dataHelpers.events             = require('./data-helpers-events')(knex)

module.exports = dataHelpers;
