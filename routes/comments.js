const commentsRouter = require("express").Router();
const {
  patchCommentById,
  removeCommentById
} = require("../controllers/comments");
const { methodNotAllowed } = require("../errors");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(removeCommentById)
  .all(methodNotAllowed);
module.exports = commentsRouter;
