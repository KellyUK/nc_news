const { updateCommentVotes } = require("../models/comments");

exports.patchCommentById = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  updateCommentVotes(comment_id, inc_votes)
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({
          status: 404,
          message: "No comment found"
        });
      }
      res.status(200).send({ comment });
    })
    .catch(next);
};
