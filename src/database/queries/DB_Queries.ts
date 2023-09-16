import { MysqlError, FieldInfo } from "mysql";
import { MySQL } from "../connection/Mysql.db";
import { QueryModel } from "../models/query.db.model";

export class DBQueries {
    static sqlQuery(sqlQuery: QueryModel, callback: Function): void {
        MySQL.DBInstance.DBConnection.query(sqlQuery, (error: MysqlError, results: any, _fields: FieldInfo[] | undefined) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, results);
            }
        })
    }
}