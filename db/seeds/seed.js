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
      const topicsPromise = knex("topics")
        .insert(topicsData)
        .returning("*");
      const usersPromise = knex("users")
        .insert(usersData)
        .returning("*");
      return Promise.all([topicsPromise, usersPromise]);
    })
    .then(() => {
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
