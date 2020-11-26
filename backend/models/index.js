const config = require("../config/db.config.js");
const mysql = require('mysql2/promise');
const Sequelize = require("sequelize");

module.exports = db = {};

initialize();

async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = config;
  
  try{

    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  
    // connect to db
    const sequelize = new Sequelize(
      config.database,
      config.user,
      config.password,
      {
        timezone: '+05:30',
        host: config.host,
        dialect: config.dialect,
        operatorsAliases: '0',
        logging: config.logging,
        pool: {
          max: config.pool.max,
          min: config.pool.min,
          acquire: config.pool.acquire,
          idle: config.pool.idle
        }
      }
    );
  
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;
  
    // init models and add them to the exported db object
    db.user = require("../models/user.model.js")(sequelize, Sequelize);
    db.diary = require("./diary.model.js")(sequelize, Sequelize);
      db.user.hasMany(db.diary, { foreignKey: 'userId' });
  
    // sync all models with database
    await sequelize.sync();
    
    //run the following incase of development
    // await sequelize.sync({force: true}).then(() => {
    //   console.log('Drop and Resync Db');
    //   const initialize = require("./initialize");
    //   initialize.init();
    // });
  } catch(e){
    console.log("error", e)
  }
}