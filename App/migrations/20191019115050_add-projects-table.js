
exports.up = function (knex, Promise) {
  return Promise.all([
      knex.schema.createTableIfNotExists("projects", function (table) {
        table.increments('id')
        table.string('name')
        table.string('description')
      }).then(function () {
              return knex("payment_paypal_status").insert([
                  {name: "Our Website", description: "A"},
                  {name: "Scenic routes", description: "BB"},
                  {name: "AirBnB smart pricing", description: "CCC"},
                  {name: "Scraping App", description: "DDDD"}
              ]);
          }
      ),
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
      knex.schema.dropTableIfExists("projects")
  ]);
};
