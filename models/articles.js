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

exports.fetchAllArticles = ({ sort_by = "created_at", order = "desc" }) => {
  return connection
    .select("articles.*")
    .count("comment_id AS comment_count")
    .from("articles")
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order);
};

exports.updateVoteCount = (id, increment) => {
  return connection
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": id })
    .increment("votes", increment)
    .returning("*");
};

exports.fetchCommentsByArticleId = (
  id,
  { sort_by = "created_at", order = "desc" }
) => {
  return connection
    .select("comments.*")
    .from("comments")
    .orderBy(sort_by, order)
    .where({ "comments.article_id": id });
};

///post**
exports.postCommentByArticleId = (id, newComment) => {
  return connection
    .insert([newComment])
    .into("comments")
    .returning("*");
};
