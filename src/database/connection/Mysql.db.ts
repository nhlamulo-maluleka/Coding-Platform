import { createPool, MysqlError, Pool, PoolConnection } from "mysql"

export class MySQL {
    connection: Pool;
    dbConnection!: PoolConnection;
    static _instance: MySQL | null = null;

    constructor() {
        this.connection = createPool({
            connectionLimit: 50,
            host: 'localhost', //sql8.freemysqlhosting.net
            user: 'root', //sql8618973
            password: '', //XlNadARTdy
            database: 'sql8618973'
        });
    }

    static get DBInstance(): MySQL {
        if (!this._instance)
            this._instance = new MySQL();
        return this._instance;
    }

    get mySqlConnection(): Pool {
        return this.connection;
    }

    set DBConnection(connection: PoolConnection) {
        this.dbConnection = connection;
    }

    get DBConnection(): PoolConnection {
        return this.dbConnection;
    }

    establishDBConnection(callback: Function): void {
        this.mySqlConnection.getConnection(
            (err: MysqlError, connection: PoolConnection) => {
                if (err) {
                    callback(err.message);
                }
                else {
                    this.DBConnection = connection;
                    callback("Connection to database successful...");
                }
            }
        )
    }

    releaseConnection(): void {
        this.DBConnection.release();
    }

    destroyConnection(): void {
        this.DBConnection.destroy();
    }
}
