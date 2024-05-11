"use strict";
var sql = require("../model/db");
var Model = function () {};

Model.GetData = async (userData, result) => {
  try {
    let query = `exec proc_GetData 
        @name=${val(userData.Name)}`;
    const pool = await sql.poolPromise;
    const recordset = await pool.request().query(query);
    result(null, recordset.recordsets);
  } catch (error) {
    process.logger.error("error:" + JSON.stringify(error));
    result(error);
  }
};

module.exports = Model;
