const CryptoJS = require("crypto-js");

function randomString(length) {
  try {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    var key = text;
    return key;
  } catch (error) {
    console.log("error", error);
  }
}
exports.decryptJS = async (cipherData) => {
  try {
    if (!cipherData) {
      throw Error("somthing went wrong !!");
    }
    var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
    var iv = CryptoJS.enc.Utf8.parse(cipherData.slice(cipherData.length - 16));
    cipherData = cipherData.slice(0, cipherData.length - 16);
    var decrypted = CryptoJS.AES.decrypt(cipherData, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    let Jsondata = JSON.parse(` ${decrypted.toString(CryptoJS.enc.Utf8)}`);
    return Jsondata;
  } catch (error) {
    console.log("error", error);
  }
};

exports.EncryptJS = async (plain) => {
  try {
    let randomIV = await randomString(16);
    var key = CryptoJS.enc.Utf8.parse("$P@mOu$0172@0r!P");
    var iv = CryptoJS.enc.Utf8.parse(randomIV);
    // var iv = CryptoJS.enc.Utf8.parse("@1O2j3D4e5F6g7P8");
    var encrypted = CryptoJS.AES.encrypt(JSON.stringify(plain), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    let encrypt = encrypted.toString() + randomIV;
    return encrypt.replace(/\\/g, "/");
  } catch (error) {
    console.log("error", error);
  }
};
