module.exports = function (app) {
  var Controller = require("../controller/Controller");
  var verifyAuthToken = require("../controller/auth/accessToken");

  app.post("/createUser", Controller.createUser); //1
  app.post("/generatetoken", Controller.generatetoken); //1

  console.log("llll");
};
