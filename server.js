const express = require("express");
const decrypt = require("./app/config/crypto");
(app = express()), (bodyParser = require("body-parser"));
port = process.env.PORT || 3003;
const helmet = require("helmet");
app.disable("X-Powered-By");
var AppRoutes = app.listen(port);
console.log("API server started on: " + port);
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

var routes = require("./app/routes/approutes"); //importing route

routes(app);
