const { fetchUser } = require("../models/users");

exports.sendUser = (req, res, next) => {
  const { username } = req.params;
  fetchUser(username)
    .then(([user]) => {
      if (!user) {
        return Promise.reject({
          status: 404,
          message: "No user found"
        });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};
