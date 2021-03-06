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

exports.fetchAllArticles = ({
  sort_by = "created_at",
  order = "desc",
  author,
  topic
}) => {
  if (author && topic) {
    return connection
      .select("articles.*")
      .count("comment_id AS comment_count")
      .from("articles")
      .where({ "articles.author": author })
      .andWhere({ "articles.topic": topic })
      .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
      .groupBy("articles.article_id")
      .orderBy(sort_by, order)
      .returning("*");
  } else if (author) {
    return connection
      .select("articles.*")
      .count("comment_id AS comment_count")
      .from("articles")
      .where({ "articles.author": author })
      .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
      .groupBy("articles.article_id")
      .orderBy(sort_by, order)
      .returning("*");
  } else if (topic) {
    return connection
      .select("articles.*")
      .count("comment_id AS comment_count")
      .from("articles")
      .where({ "articles.topic": topic })
      .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
      .groupBy("articles.article_id")
      .orderBy(sort_by, order)
      .returning("*");
  } else {
    return connection
      .select("articles.*")
      .count("comment_id AS comment_count")
      .from("articles")
      .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
      .groupBy("articles.article_id")
      .orderBy(sort_by, order)
      .returning("*");
  }
};

exports.updateVoteCount = (id, { increment = 0 }) => {
  return connection
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": id })
    .increment("votes", increment)
    .returning("*");
};

exports.updateVoteCount = (id, inc_votes = 0) => {
  return connection
    .select("articles.*")
    .from("articles")
    .where({ "articles.article_id": id })
    .increment("votes", inc_votes)
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

exports.postCommentByArticleId = ({ article_id, username, body }) => {
  return connection("articles")
    .insert({ author: username, body, article_id })
    .into("comments")
    .where({ "articles.article_id": article_id })
    .returning("*");
};
