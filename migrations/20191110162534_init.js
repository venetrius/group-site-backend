exports.up = function (knex, Promise) {
  return knex.schema.createTable("projects", function (table) {
    table.increments('id')
    table.string('name')
    table.string('description')
  }).then(function () {
          return knex("projects").insert([
            {name: "Our Website", description: "A"},
            {name: "Scenic routes", description: "BB"},
            {name: "AirBnB smart pricing", description: "CCC"},
            {name: "Scraping App", description: "DDDD"}
          ]);
      }
  );
};

exports.down = function (knex, Promise) {
return knex.schema.dropTable("projects")
};
