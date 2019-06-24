const app = require("./app");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/products/:id", function(req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(80, function() {
  console.log("CORS-enabled web server listening on port 80");
});

const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
