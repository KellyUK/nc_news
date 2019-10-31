const topicsRouter = require("express").Router();
const { sendTopics } = require("../controllers/topics");
const { methodNotAllowed } = require("../errors");

topicsRouter
  .route("/")
  .get(sendTopics)
  .all(methodNotAllowed);

module.exports = topicsRouter;
