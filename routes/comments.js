const commentsRouter = require("express").Router();
const {
  patchCommentById,
  removeCommentById
} = require("../controllers/comments");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(removeCommentById);
module.exports = commentsRouter;
