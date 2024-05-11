// with Dev Snehal
"user strict";
var sql = require("mssql");

var config = {
  //ur local db
  user: "sa",
  password: "Snehal@987",
  dialect: "mssql",
  server: "LAPTOP-3I8F03BS\\MSSQLSERVER2",
  database: "ERSystem",
  requestTimeout: 300000,
  port: 1343, // check the port once again
  debug: true,
  dialectOptions: {},
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

sql.connect(config, function (err) {
  if (err) {
    console.log(err);
    request = new sql.Request();
    // create Request object
  }
  console.log("DB Connected");
  // query to the database and get the records
});
module.exports = sql;
