"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBQueries = void 0;
const Mysql_db_1 = require("../connection/Mysql.db");
class DBQueries {
    static sqlQuery(sqlQuery, callback) {
        Mysql_db_1.MySQL.DBInstance.DBConnection.query(sqlQuery, (error, results, _fields) => {
            if (error) {
                callback(error, null);
            }
            else {
                callback(null, results);
            }
        });
    }
}
exports.DBQueries = DBQueries;
