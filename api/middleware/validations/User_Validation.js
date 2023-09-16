"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const ErrorHandlerResponse_1 = require("../../models/response/error/ErrorHandlerResponse");
const DB_Queries_1 = require("../../database/queries/DB_Queries");
const validateUser = (req, res, next) => {
    var _a;
    DB_Queries_1.DBQueries.sqlQuery({
        sql: "SELECT `user_id` FROM `user_auth` WHERE `auth_token` = ?",
        values: [(_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(/\s/)[1]]
    }, (error, result) => {
        if (error) {
            res.status(500).send(new ErrorHandlerResponse_1.ErrorHandlerResponse(error.message, 500));
        }
        else {
            if (result.affectedRows === 0) {
                res.status(400).send(new ErrorHandlerResponse_1.ErrorHandlerResponse("Unauthorized"));
            }
            else {
                req.headers['user_id'] = result[0]["user_id"];
                next();
            }
        }
    });
};
exports.validateUser = validateUser;
