import { Request, Response, NextFunction } from "express";
import { MysqlError } from "mysql";
import { ErrorHandlerResponse } from "../../models/response/error/ErrorHandlerResponse";
import { DBQueries } from "../../database/queries/DB_Queries";

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    DBQueries.sqlQuery({
        sql: "SELECT `user_id` FROM `user_auth` WHERE `auth_token` = ?",
        values: [req.headers["authorization"]?.split(/\s/)[1]!]
    }, (error: MysqlError, result: any) => {
        if (error) {
            res.status(500).send(new ErrorHandlerResponse(error.message, 500));
        }
        else {
            if (result.affectedRows === 0) {
                res.status(400).send(new ErrorHandlerResponse("Unauthorized"));
            }
            else {
                req.headers['user_id'] = result[0]["user_id"];
                next();
            }
        }
    })
}