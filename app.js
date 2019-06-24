const express = require("express");
const apiRouter = require("./routes/api");
const cors = require("cors");
const app = express();

app.use(cors());

const {
  routeNotFound,
  handleCustomErrors,
  handleSqlErrors,
  methodNotAllowed,
  handle500
} = require("./errors");
const app = express();

app.use(express.json());

app.route("/").all(methodNotAllowed);

app.use("/api", apiRouter);

app.all("/*", routeNotFound);

app.use(handleSqlErrors);

app.use(handleCustomErrors);

app.use(handle500);

module.exports = app;
