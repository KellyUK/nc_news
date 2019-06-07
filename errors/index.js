exports.routeNotFound = (req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ message: err.message || "Bad Regquest" });
  } else if (err.status === 404) {
    res.status(404).send({ message: err.message || "does not exist" });
  } else next(err);
};

exports.handleSqlErrors = (err, req, res, next) => {
  const psqlBadRequestCodes = ["22P02", "23502"];
  if (psqlBadRequestCodes.includes(err.code)) {
    res.status(400).send({ message: err.message || "Bad request" });
  } else next(err);
};

exports.handle500 = (err, req, res, next) => {
  console.log("error in index", err);
  res.status(500).send({ msg: "Internal Server Error" });
};
