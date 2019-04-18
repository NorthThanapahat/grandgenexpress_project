const mySql = require('mysql');
const passwordDev = "password";
const passwordPro = "gr@ndgeneXpre55";
const connection = mySql.createConnection({
    host:"127.0.0.1",
	port:"3306",
    user:"ggnp_admin",
    database:"grandgenexpress_db",
    password:"gr@ndgeneXpre55"
});
    module.exports = connection;
