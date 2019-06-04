const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("../data");
const {
  formatArticle,
  createArticleRefObject,
  formatAllComments
} = require("../../utils/utils");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicsData)
        .returning("*");
    })
    .then(topicsRows => {
      return knex("users")
        .insert(usersData)
        .returning("*");
    })
    .then(usersRows => {
      return knex("articles")
        .insert(formatArticle(articlesData))
        .returning("*");
    })
    .then(insertedArticles => {
      const commentlookup = createArticleRefObject(insertedArticles);
      const formattedComments = formatAllComments(commentsData, commentlookup);
      return knex("comments")
        .insert(formattedComments)
        .returning("*");
    });
};
