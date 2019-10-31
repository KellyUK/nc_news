const connection = require("../db/connection");

exports.updateCommentVotes = (id, inc_votes = 0) => {
  return connection
    .select("comments.*")
    .from("comments")
    .where({ "comments.comment_id": id })
    .increment("votes", inc_votes)
    .returning("*");
};

exports.deleteCommentById = id => {
  return connection("comments")
    .where({ comment_id: id })
    .del();
};
