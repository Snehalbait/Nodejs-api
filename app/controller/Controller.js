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

exports.createUser = async (req, res, next) => {
  try {
    decrypt = await EncryptDecrypt.decryptJS(req.body);
  } catch (err) {
    process.logger.error(
      "Request Method:[" + req.method + "] Url:[" + req.url + "] Error:" + err
    );
    res.send("ERROR : " + err);
  }
  Model.createUser(decrypt, async function (err, result) {
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
      res.error.Default("Something went wrong", err);
    } else {
      var data = {
        message: "Sucess",
        Responsecode: 100,
        status: result[0],
      };
      encrypt = await EncryptDecrypt.EncryptJS(data);
      res.send({
        Data: encrypt,
      });
    }
  });
};

exports.generatetoken = async (req, res, next) => {
  try {
    decrypt = await EncryptDecrypt.decryptJS(req.body);
    console.log(req.body);
  } catch (err) {
    process.logger.error(
      "Request Method:[" + req.method + "] Url:[" + req.url + "] Error:" + err
    );
    res.send("ERROR : " + err);
  }
  Model.generatetoken(decrypt, async function (err, result) {
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
      res.error.Default("Something went wrong", err);
      // return err;
    } else {
      var data = {
        message: "Sucess",
        Responsecode: 100,
        status: result[0],
      };
      encrypt = await EncryptDecrypt.EncryptJS(data);
      res.send({
        Data: encrypt,
      });
    }
  });
};
