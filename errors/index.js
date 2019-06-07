exports.customhandleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlBadRequestCodes = ["22P02", "23502"];
  if (psqlBadRequestCodes.includes(err.code) || status === 400)
    res.status(400).send({ msg: err.message || "Bad Request" });
  else next(err);
};

exports.routeNotFound = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ msg: "Route Not Found" });
  }
};

exports.methodNotAllowed = (err, req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  console.log("error in index", err);
  res.status(500).send({ msg: "Internal Server Error" });
};
