import { randomBytes } from "crypto"
import { FieldInfo, MysqlError } from "mysql";
import { Router, Request, Response } from "express"

import { Language } from "../core/enums/Languages";
import { CSharpService } from "../services/CSharp.service";
import { jwtEncode } from "../middleware/security/jwt.security";
import { CodeOutputResponse } from "../models/response/CodeOutputResponse.model";
import { CodeOutputErrorHandler } from "../models/errors/CodeOutputErrorHandler";
import { isUserRegistered } from "../middleware/validations/Check_If_User_Already_Registered";
import { DBQueries } from "../database/queries/DB_Queries";
import { decrypt, encrypt, encryptByKey } from "../core/helpers/string_encrypt_decrypt";
import { validateUser } from "../middleware/validations/User_Validation";

// Instantiating router and database
const expressRouter: Router = Router();

expressRouter.get("/", (_req, res) => {
    res.send("Welcome to Rapid Coding!!");
})

expressRouter.post("/authUser", isUserRegistered, (req: Request, res: Response) => {
    const { firstname, lastname, email, profile } = req.body;

    if (req.headers["exist"] === "0") {
        const [generatedToken, secret] = encrypt({ user: email });

        DBQueries.sqlQuery({
            sql: 'INSERT INTO `users`(`firstname`, `lastname`, `email`, `profile`) VALUES(?, ?, ?, ?)',
            values: [firstname, lastname, email, profile]
        }, (error: MysqlError, results: any) => {
            if (error) {
                res.status(400).send({ message: error.message });
                return;
            }

            // Creating an auth_user
            DBQueries.sqlQuery({
                sql: 'INSERT INTO `user_auth`(`auth_token`, `auth_secret`, `user_id`) VALUES (?, ?, ?)',
                values: [generatedToken, secret, results.insertId]
            }, (error: MysqlError, results: any) => {
                if (error) {
                    res.status(400).send({ message: error.message });
                    return;
                }

                res.status(200).send({ token: generatedToken });
            })
        })
    }
    else {
        DBQueries.sqlQuery({
            sql: 'SELECT `user_auth`.`auth_token`, `user_auth`.`auth_secret`, `user_auth`.`user_id` FROM `users`, `user_auth` WHERE `users`.`user_id` = `user_auth`.`user_id` AND `users`.`email` = ?',
            values: [email]
        }, (error: MysqlError, results: any) => {
            if (error) {
                res.status(400).send({ message: error.message });
                return;
            }

            const decrypted: any = decrypt(results[0]["auth_token"], results[0]["auth_secret"])
            const newEncryptedToken: string = encryptByKey({ user: decrypted.user }, results[0]["auth_secret"])

            DBQueries.sqlQuery({
                sql: "UPDATE `user_auth` SET `auth_token`= ? WHERE `user_id` = ?",
                values: [newEncryptedToken, results[0]["user_id"]]
            }, (error: MysqlError, _results: any) => {
                if (error) {
                    res.status(400).send({ message: error.message });
                    return;
                }

                res.status(200).send({ token: newEncryptedToken });
            })
        })
    }
})

expressRouter.post("/login", (req: Request, res: Response) => {

})

expressRouter.post("/createSession", validateUser, (req: Request, res: Response) => {
    const { title, description, language, privacy } = req.body;

    DBQueries.sqlQuery({
        sql: "INSERT INTO `user_sessions`(`title`, `description`, `language`, `privacy`, `user_id`) VALUES (?, ?, ?, ?, ?)",
        values: [title, description, language, privacy, req.headers["user_id"]]
    }, (error: MysqlError, result: any) => {
        if (error) {
            res.status(400).send({ message: error.message });
            return;
        }

        res.status(200).send({ session: result.insertId })
    })
})

expressRouter.get("/session/:id", validateUser, (req: Request, res: Response) => {
    const sessionId = req.params.id;

    DBQueries.sqlQuery({
        sql: "SELECT * FROM `user_sessions`, `user_auth` WHERE `user_sessions`.`user_id` = `user_auth`.`user_id` AND `user_sessions`.`session_id` = ?",
        values: [sessionId]
    }, (error: MysqlError, result: any) => {
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
        })
    })
})

expressRouter.post("/csharp", ({ body: { usercode } }, res) => {
    const cSharpService: CSharpService = new CSharpService();

    try {
        cSharpService.executeCode(usercode, Language.CSHARP, (outputResponse: CodeOutputResponse | CodeOutputErrorHandler) => {
            res.status(outputResponse.status).send(outputResponse);
        })
    } catch (err) {
        res.status(403).send(new CodeOutputErrorHandler(String(err), 403))
    }
})

// expressRouter.post("/java", ({ body: { usercode } }, res) => {
//     res.send(Language.JAVA)
// })

// expressRouter.post("/javascript", ({ body: { usercode } }, res) => {
//     res.send(Language.JAVASCRIPT)
// })

export { expressRouter }