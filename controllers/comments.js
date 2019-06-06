const { updateCommentVotes } = require("../models/comments");

exports.patchCommentsById = (req, res, next) => {
  const { comment_id } = req.params;
  const increment = req.body.inc_votes;
  updateCommentVotes(comment_id, increment)
    .res.status(200)
    .send({ comment });
};
