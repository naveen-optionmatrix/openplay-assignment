

let host = (process.env.DB_HOST) ? process.env.DB_HOST : "localhost";
let user = (process.env.DB_USER) ? process.env.DB_USER : "root";
let password = (process.env.DB_PASSWORD) ? process.env.DB_PASSWORD : "";
let database = (process.env.DB_DATABASE) ? process.env.DB_DATABASE : "openplaydb";
let logging = (process.env.logging) ? process.env.logging : false;
let dialect = (process.env.dialect) ? process.env.dialect : "mysql";
let port = (process.env.port) ? process.env.port : "3306";
let url = (process.env.url) ? process.env.url : "http://localhost";

module.exports = {
    host: host,
    port: port,
    user: user,
    password: password,
    database: database,
    logging: logging,
    dialect: dialect,
    pool: {
      max: 5, //max number of connections
      min: 0, //min number of connections
      acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000 //maximum time, in milliseconds, that a connection can be idle before being released
    }
  };
