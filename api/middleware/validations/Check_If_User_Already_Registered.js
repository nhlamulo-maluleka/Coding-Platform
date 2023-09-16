"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserRegistered = void 0;
const Mysql_db_1 = require("../../database/connection/Mysql.db");
const ErrorHandlerResponse_1 = require("../../models/response/error/ErrorHandlerResponse");
const isUserRegistered = (req, res, next) => {
    Mysql_db_1.MySQL.DBInstance.DBConnection.query({
        sql: "SELECT `user_id` FROM `users` WHERE `email` = ?",
        values: [req.body.email]
    }, (error, result) => {
        if (error) {
            res.status(500).send(new ErrorHandlerResponse_1.ErrorHandlerResponse(error.message));
        }
        else {
            req.headers["exist"] = Object.keys(result).length === 1 ? "1" : "0";
            next();
        }
    });
};
exports.isUserRegistered = isUserRegistered;
// const middleware = (req: any, res: any, next: any) => {
//     next();
// }
