"use strict";
var sql = require("../model/db");
var Model = function () {};
const jwt = require("jsonwebtoken");

Model.createUser = async (userData, result) => {
  try {
    let query = `exec proc_createUser  
    @employeeId=${val(userData.employeeId)},
    @employeeName=${val(userData.employeeName)},
    @address=${val(userData.address)}`;
    const pool = await sql.poolPromise;
    const recordset = await pool.request().query(query);
    result(null, recordset.recordsets);
  } catch (error) {
    process.logger.error("error:" + JSON.stringify(error));
    result(error);
  }
};

Model.generatetoken = async (userData, result) => {
  try {
    let query = `exec proc_createUser  
    @employeeId=${val(userData.employeeId)}`;
    const pool = await sql.poolPromise;
    console.log(query, "query11111");

    const recordset = await pool.request().query(query);
    let paylodjwt = {
      employeeName: recordset.recordset[0].employeeName,
      employeeId: recordset.recordset[0].employeeId,
    };
    jwt.sign(
      paylodjwt,
      "Nodejsapi",
      { expiresIn: 300 * 300 },

      async (err, token) => {
        if (token) {
          let query = `exec proc_createUser  
    @employeeId=${val(userData.employeeId)},
    @token=${val(token)}`;
          console.log(query, "query");
          const pool = await sql.poolPromise;
          const recordset = await pool.request().query(query);
          result(null, recordset.recordsets[0]);
        } else {
          process.logger.error("token error:" + JSON.stringify(err)); // logger
          res.error.Default("Something went wrong", err);
        }
      }
    );
  } catch (error) {
    process.logger.error("error:" + JSON.stringify(error));
    result(error);
  }
};

const val = (value) => {
  if (value) {
    return "'" + value + "'";
  } else {
    return "NULL";
  }
};

module.exports = Model;
