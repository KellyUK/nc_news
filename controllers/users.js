const { fetchUser } = require("../models/users");

exports.sendUser = (req, res, next) => {
  const { username } = req.params;
  fetchUser(username)
    .then(user => {
      if (user.length === 0) {
        return Promise.reject({
          status: 404,
          message: "No user found"
        });
      }
      res.status(200).send({ user });
    })
    .catch(next);
};
