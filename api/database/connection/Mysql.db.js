"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQL = void 0;
const mysql_1 = require("mysql");
class MySQL {
    constructor() {
        this.connection = (0, mysql_1.createPool)({
            connectionLimit: 50,
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'sql8618973'
        });
    }
    static get DBInstance() {
        if (!this._instance)
            this._instance = new MySQL();
        return this._instance;
    }
    get mySqlConnection() {
        return this.connection;
    }
    set DBConnection(connection) {
        this.dbConnection = connection;
    }
    get DBConnection() {
        return this.dbConnection;
    }
    establishDBConnection(callback) {
        this.mySqlConnection.getConnection((err, connection) => {
            if (err) {
                callback(err.message);
            }
            else {
                this.DBConnection = connection;
                callback("Connection to database successful...");
            }
        });
    }
    releaseConnection() {
        this.DBConnection.release();
    }
    destroyConnection() {
        this.DBConnection.destroy();
    }
}
exports.MySQL = MySQL;
MySQL._instance = null;
