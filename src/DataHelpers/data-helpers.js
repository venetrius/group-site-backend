require('dotenv').config();

let connection

if(process.env.NODE_ENV === 'development'){
  connection =  {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME,
    port     : process.env.DB_PORT,
    ssl      : process.env.DB_SSL
  }
}else{
  connection = process.env.DATABASE_URL + '?ssl=true'
}
const knex = require('knex')({
    client: 'pg',
    connection
});
const dataHelpers = {
  projects_helpers : require('./data-helpers-projects')(knex)
}

module.exports = dataHelpers;