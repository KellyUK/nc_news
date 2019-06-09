const { getJson } = require("../models/api");

exports.sendJson = (req, res, next) => {
  let body = getJson();
  res.status(200).json({ body });
};
