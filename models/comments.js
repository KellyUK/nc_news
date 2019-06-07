const connection = require("../db/connection");

exports.updateCommentVotes = (id, increment) => {
  return connection
    .select("comments.*")
    .from("comments")
    .where({ "comments.comment_id": id })
    .increment("votes", increment)
    .returning("*");
};
