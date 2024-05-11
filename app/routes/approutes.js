module.exports = function (app) {
  var Controller = require("../controller/Controller");

  app.post("/GetData", Controller.GetData); //1

  return app;
};
