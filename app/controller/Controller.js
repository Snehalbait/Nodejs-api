"use strict";
var Model = require("../model/Model");
var multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
var atob = require("atob");
const { authenticate } = require("ldap-authentication");
var EncryptDecrypt = require("../config/crypto");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./upload");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      "attachment" + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({ storage: storage }).array("attachments", 2);
let decrypt;
let encrypt;

exports.GetData = async (req, res, next) => {
  if (!req.headers.authorization) return res.error.Default("Token not found");
  let UserData = await EncryptDecrypt.decryptJS(req.headers.authorization);
  UserData = JSON.parse(atob(UserData.split(".")[1]));
  if (!UserData.EmpId) return res.error.Unauthorized("Unauthorized User");
  try {
    decrypt = await EncryptDecrypt.decryptJS(req.body.data);
  } catch (err) {
    process.logger.error(
      "Request Method:[" + req.method + "] Url:[" + req.url + "] Error:" + err
    );
    res.send("ERROR : " + err);
  }
  Model.GetData(decrypt, async function (err, result) {
    if (err) {
      process.logger.error(
        "Method:[" +
          req.method +
          "] url:[" +
          req.url +
          "] QueryString:[" +
          JSON.stringify(req.query) +
          "] error:" +
          JSON.stringify(err)
      ); // logger
      await SenderrorMail.errornotification("/GetCandidatebysearch", err);
      res.error.Default("Something went wrong", err);
      // return err;
    } else {
      var data = {
        Data: result,
      };
      encrypt = await EncryptDecrypt.EncryptJS(data);
      res.send({
        Data: encrypt,
      });
    }
  });
};
