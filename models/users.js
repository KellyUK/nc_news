const connection = require("../db/connection");

exports.fetchUser = name => {
  return connection
    .select("*")
    .from("users")
    .where({ username: name });
};
