const express = require("express");
const apiRouter = require("./routes/api");
const {
  routeNotFound,
  handleCustomErrors,
  handleSqlErrors,
  handle500
} = require("./errors");
const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  const psqlBadRequestCodes = ["22P02"];
  if (psqlBadRequestCodes.includes(err.code)) {
    res.status(400).send({ message: err.message || "Bad request" });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ message: err.message || "does not exist" });
  } else next(err);
});

app.all("/*", routeNotFound);

app.use(handle500);

module.exports = app;
