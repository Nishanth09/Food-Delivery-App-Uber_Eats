const session = require('express-session');
const mysql2 = require('mysql2/promise');
const MySQLStore = require('express-mysql-session')(session);
const settings = require('./settings')

//cannot reuse the exsisting connection pool, since we imported with promises
//const base = require("./models/base")


//Good to have a seeprate user/DB for session, for time being we are reusing the exsisting one.
var db_options = {
    host              : settings.MYSQL_HOST,
    user              : settings.MYSQL_USER,
    port              : settings.MYSQL_PORT,
    password          : settings.MYSQL_PASSWORD,
    database          : settings.MYSQL_DATABASE,
};



const sessions_options = {
    "expiration": "3600000"
}

const mysql_session_pool = mysql2.createPool(db_options);

const store = new MySQLStore(sessions_options, mysql_session_pool)

module.exports = {
    store
}