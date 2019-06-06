const articlesRouter = require("express").Router();
const {
  sendArticle,
  patchArticleById,
  sendCommentsByArticleId,
  postComment
} = require("../controllers/articles");

articlesRouter
  .route("/:article_id")
  .get(sendArticle)
  .patch(patchArticleById);

articlesRouter.route("/:article_id/comments").get(sendCommentsByArticleId);

module.exports = articlesRouter;
