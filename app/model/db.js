// with Dev Snehal
"user strict";
var sql = require("mssql");

var config = {
  //ur local db
  user: "TestDB",
  password: "12345",
  dialect: "mssql",
  server: "LAPTOP-3I8F03BS\\MSSQLSERVER2",
  database: "TestDB",
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

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));
module.exports = {
  sql,
  poolPromise,
};
