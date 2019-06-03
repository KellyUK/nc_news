exports.up = function(knex, Promise) {
  console.log("creating users_Table...");
  return knex.schema.createTable("users", users_table => {
    users_table.string("username").primary();
    users_table.string("avatar_url");
    users_table.string("name").notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log("removing houses....");
  return knex.schema.dropTable("users");
};
