exports.up = function(knex, Promise) {
  return knex.schema.createTable("topics", topics_table => {
    topics_table.string("slug").primary();
    topics_table.string("description");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("topics");
};
