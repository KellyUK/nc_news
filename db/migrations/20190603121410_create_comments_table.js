exports.up = function(knex, Promise) {
  console.log("creating comments_Table...");
  return knex.schema.createTable("comments", comments_table => {
    comments_table.string("comment_id").primary();
    comments_table.string("author");
    comments_table.integer("article_id").references("articles.article_id");
    comments_table.integer("votes").defaultTo(0);
    comments_table.timestamp("created_at").defaultTo(knex.fn.now());
    comments_table.string("body");
  });
};

exports.down = function(knex, Promise) {
  console.log("removing comments ....");
  return knex.schema.dropTable("comments");
};
