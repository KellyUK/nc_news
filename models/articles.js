const connection = require("../db/connection");

exports.fetchArticle = id => {
  return connection
    .select("articles.*")
    .count("comment_id AS comment_count")
    .from("articles")
    .where({ "articles.article_id": id })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id");
};

exports.updateVoteCount;
