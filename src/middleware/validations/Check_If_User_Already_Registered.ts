import { Request, Response, NextFunction } from "express";
import { MySQL } from "../../database/connection/Mysql.db";
import { MysqlError } from "mysql";
import { ErrorHandlerResponse } from "../../models/response/error/ErrorHandlerResponse";

export const isUserRegistered = (req: Request, res: Response, next: NextFunction) => {
    MySQL.DBInstance.DBConnection.query({
        sql: "SELECT `user_id` FROM `users` WHERE `email` = ?",
        values: [req.body.email]
    }, (error: MysqlError, result: any) => {
        if (error) {
            res.status(500).send(new ErrorHandlerResponse(error.message));
        }
        else {
            req.headers["exist"] = Object.keys(result).length === 1 ? "1" : "0";
            next();
        }
    })
}

// const middleware = (req: any, res: any, next: any) => {
//     next();
// }