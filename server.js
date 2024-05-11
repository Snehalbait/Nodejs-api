const express = require("express");
const decrypt = require("./app/config/crypto");
(app = express()), (bodyParser = require("body-parser"));
port = process.env.PORT || 3009;
var cors = require("cors");
const helmet = require("helmet");
var compression = require("compression");
var timeout = require("connect-timeout"); //express v4
var responseHandler = require("express-response-handler");
app.disable("x-powered-by");

// Custom Error Code
var customCodes = [
  ["Unauthorized", "error", 401],
  ["success", "success", 200],
  ["Created", "success", 201],
  ["Accepted", "success", 202],
  ["Updated", "success", 203],
  ["NoContent", "success", 204],
  ["ResetContent", "success", 205],
  ["PartialContent", "success", 206],
  ["Deleted", "success", 207],
  ["Default", "error", 500],
];
app.use(responseHandler(customCodes));
app.use(timeout(360000));
app.use(haltOnTimedout);
function haltOnTimedout(req, res, next) {
  if (!req.timedout) next();
}
//for accessing images of upload folder
app.use(compression());
app.set("etag", false);
app.use(helmet());

app.use(function (err, req, res, next) {
  res.status(500);
  res.send("Oops, something went wrong.");
});

app.use((req, res, next) => {
  res.header(
    "Cache-Control",
    "no-cache, no-store, max-age=0, s-maxage=0, must-revalidate ,post-check=0, pre-check=0"
  );
  // res.header('max-age=0, s-maxage=0');
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
});
var routes = require("./app/routes/approutes"); //importing route
var router = express.Router();
app.use("/ERSystemAPI2", routes(router));

//routes(app);
