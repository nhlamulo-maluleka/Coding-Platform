import { json } from "express";
import cors from "cors";

import { ExpressServer } from "./servers/ExpressServer"
import { HttpServer } from "./servers/HttpServer"
import { expressRouter } from "./routes/Routes";
import { initSocketServer } from "./socket/socket.io";
import { MySQL } from "./database/connection/Mysql.db";

const expressServer = new ExpressServer();
expressServer.expressUse(json());
expressServer.expressUse(cors());
expressServer.expressUseByKeyValue("/api/v1", expressRouter);

const httpServer = new HttpServer(expressServer);

// Starting the http-server on a port
httpServer.startServer();

// Starting the socket.io server
initSocketServer(httpServer);

// Initialize Database connection
MySQL.DBInstance.establishDBConnection((connectionResponse: any) => {
    console.log(connectionResponse)
})