exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", comments_table => {
    comments_table.increments("comment_id").primary();
    comments_table.string("author");
    comments_table.integer("article_id").references("articles.article_id");
    comments_table.integer("votes").defaultTo(0);
    comments_table.timestamp("created_at").defaultTo(knex.fn.now());
    comments_table.text("body");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
