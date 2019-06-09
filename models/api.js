const fs = require("fs");
const rawJsonObject = fs.readFileSync("./endpoints.json");

exports.getJson = () => {
  return JSON.parse(rawJsonObject);
};
