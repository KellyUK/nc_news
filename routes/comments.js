const commentsRouter = require("express").Router();
const { patchCommentsById } = require("../controllers/comments");

commentsRouter.route("/:comments").patch(patchCommentsById);
console.log("comments router");

module.exports = commentsRouter;
