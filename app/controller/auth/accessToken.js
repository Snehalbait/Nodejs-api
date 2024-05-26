var EncryptDecrypt = require("../../config/crypto");
var erModel = require("../../model/Model");
var atob = require("atob");
async function verifyAuthToken(req, res, next) {
  let UserData = await EncryptDecrypt.decryptJS(req.headers.authorization);
  UserData = JSON.parse(atob(UserData.split(".")[1]));
  let LoginTokenVerify = {
    type: req.headers.type,
    empId: UserData.EmpId,
  };
  let data = await erModel.getUserLoginToken(LoginTokenVerify);
  if (!req.headers.authorization) {
    res.error.Unauthorized("Token not found");
  } else if (!data[0]) {
    res.error.Unauthorized("Unauthorized User");
  } else if (data[0].token == req.headers.authorization) {
    next();
  } else {
    res.error.Unauthorized("Unauthorized User");
  }
}

module.exports = verifyAuthToken;
