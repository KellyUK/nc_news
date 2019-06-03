exports.up = function(knex, Promise) {
  console.log("creating topics table...");
  return knex.schema.createTable("topics", topics_table => {
    topics_table.string("slug").primary();
    topics_table.string("description");
  });
};

exports.down = function(knex, Promise) {
  console.log("removing topics....");
  return knex.schema.dropTable("topics");
};
