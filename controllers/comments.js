const { updateCommentVotes } = require("../models/comments");

exports.patchCommentById = (req, res, next) => {
  console.log("controller....>", req);
  updateCommentVotes(req.body);
  then(comment => {
    res.status(200).send({ comment });
  }).catch(next);
};
