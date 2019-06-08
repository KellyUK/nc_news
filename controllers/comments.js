const { updateCommentVotes, deleteCommentById } = require("../models/comments");

exports.patchCommentById = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  updateCommentVotes(comment_id, inc_votes)
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          message: "No comment found"
        });
      }
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.removeCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentById(comment_id)
    .then(delCount => {
      if (delCount) res.status(204).send();
      else if (!delCount)
        return Promise.reject({ status: 404, message: "comment not found" });
    })
    .catch(next);
};
