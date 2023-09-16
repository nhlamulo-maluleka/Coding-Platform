"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressRouter = void 0;
const express_1 = require("express");
const Languages_1 = require("../core/enums/Languages");
const CSharp_service_1 = require("../services/CSharp.service");
const CodeOutputErrorHandler_1 = require("../models/errors/CodeOutputErrorHandler");
const Check_If_User_Already_Registered_1 = require("../middleware/validations/Check_If_User_Already_Registered");
const DB_Queries_1 = require("../database/queries/DB_Queries");
const string_encrypt_decrypt_1 = require("../core/helpers/string_encrypt_decrypt");
const User_Validation_1 = require("../middleware/validations/User_Validation");
// Instantiating router and database
const expressRouter = (0, express_1.Router)();
exports.expressRouter = expressRouter;
expressRouter.get("/", (_req, res) => {
    res.send("Welcome to Rapid Coding!!");
});
expressRouter.post("/authUser", Check_If_User_Already_Registered_1.isUserRegistered, (req, res) => {
    const { firstname, lastname, email, profile } = req.body;
    if (req.headers["exist"] === "0") {
        const [generatedToken, secret] = (0, string_encrypt_decrypt_1.encrypt)({ user: email });
        DB_Queries_1.DBQueries.sqlQuery({
            sql: 'INSERT INTO `users`(`firstname`, `lastname`, `email`, `profile`) VALUES(?, ?, ?, ?)',
            values: [firstname, lastname, email, profile]
        }, (error, results) => {
            if (error) {
                res.status(400).send({ message: error.message });
                return;
            }
            // Creating an auth_user
            DB_Queries_1.DBQueries.sqlQuery({
                sql: 'INSERT INTO `user_auth`(`auth_token`, `auth_secret`, `user_id`) VALUES (?, ?, ?)',
                values: [generatedToken, secret, results.insertId]
            }, (error, results) => {
                if (error) {
                    res.status(400).send({ message: error.message });
                    return;
                }
                res.status(200).send({ token: generatedToken });
            });
        });
    }
    else {
        DB_Queries_1.DBQueries.sqlQuery({
            sql: 'SELECT `user_auth`.`auth_token`, `user_auth`.`auth_secret`, `user_auth`.`user_id` FROM `users`, `user_auth` WHERE `users`.`user_id` = `user_auth`.`user_id` AND `users`.`email` = ?',
            values: [email]
        }, (error, results) => {
            if (error) {
                res.status(400).send({ message: error.message });
                return;
            }
            const decrypted = (0, string_encrypt_decrypt_1.decrypt)(results[0]["auth_token"], results[0]["auth_secret"]);
            const newEncryptedToken = (0, string_encrypt_decrypt_1.encryptByKey)({ user: decrypted.user }, results[0]["auth_secret"]);
            DB_Queries_1.DBQueries.sqlQuery({
                sql: "UPDATE `user_auth` SET `auth_token`= ? WHERE `user_id` = ?",
                values: [newEncryptedToken, results[0]["user_id"]]
            }, (error, _results) => {
                if (error) {
                    res.status(400).send({ message: error.message });
                    return;
                }
                res.status(200).send({ token: newEncryptedToken });
            });
        });
    }
});
expressRouter.post("/login", (req, res) => {
});
expressRouter.post("/createSession", User_Validation_1.validateUser, (req, res) => {
    const { title, description, language, privacy } = req.body;
    DB_Queries_1.DBQueries.sqlQuery({
        sql: "INSERT INTO `user_sessions`(`title`, `description`, `language`, `privacy`, `user_id`) VALUES (?, ?, ?, ?, ?)",
        values: [title, description, language, privacy, req.headers["user_id"]]
    }, (error, result) => {
        if (error) {
            res.status(400).send({ message: error.message });
            return;
        }
        res.status(200).send({ session: result.insertId });
    });
});
expressRouter.get("/session/:id", User_Validation_1.validateUser, (req, res) => {
    const sessionId = req.params.id;
    DB_Queries_1.DBQueries.sqlQuery({
        sql: "SELECT * FROM `user_sessions`, `user_auth` WHERE `user_sessions`.`user_id` = `user_auth`.`user_id` AND `user_sessions`.`session_id` = ?",
        values: [sessionId]
    }, (error, result) => {
        if (error) {
            res.status(400).send({ message: error.message });
            return;
        }
        const responseData = result[0];
        res.status(200).send({
            title: responseData.title,
            description: responseData.description,
            language: responseData.language,
            privacy: responseData.privacy,
            user_token: responseData.auth_token
        });
    });
});
expressRouter.post("/csharp", ({ body: { usercode } }, res) => {
    const cSharpService = new CSharp_service_1.CSharpService();
    try {
        cSharpService.executeCode(usercode, Languages_1.Language.CSHARP, (outputResponse) => {
            res.status(outputResponse.status).send(outputResponse);
        });
    }
    catch (err) {
        res.status(403).send(new CodeOutputErrorHandler_1.CodeOutputErrorHandler(String(err), 403));
    }
});
