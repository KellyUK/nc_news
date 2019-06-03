exports.up = function(knex, Promise) {
  console.log("creating articles_Table...");
  return knex.schema.createTable("articles", articles_table => {
    articles_table.increments("article_id").primary();
    articles_table.string("title");
    articles_table.text("body");
    articles_table.integer("votes").defaultTo(0);
    articles_table.string("topic").references("topics.slug");
    articles_table.string("author").references("users.username");
    articles_table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  console.log("removing articles ....");
  return knex.schema.dropTable("articles");
};
