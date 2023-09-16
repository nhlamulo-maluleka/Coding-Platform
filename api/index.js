"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const ExpressServer_1 = require("./servers/ExpressServer");
const HttpServer_1 = require("./servers/HttpServer");
const Routes_1 = require("./routes/Routes");
const socket_io_1 = require("./socket/socket.io");
const Mysql_db_1 = require("./database/connection/Mysql.db");
const expressServer = new ExpressServer_1.ExpressServer();
expressServer.expressUse((0, express_1.json)());
expressServer.expressUse((0, cors_1.default)());
expressServer.expressUseByKeyValue("/api/v1", Routes_1.expressRouter);
const httpServer = new HttpServer_1.HttpServer(expressServer);
// Starting the http-server on a port
httpServer.startServer();
// Starting the socket.io server
(0, socket_io_1.initSocketServer)(httpServer);
// Initialize Database connection
Mysql_db_1.MySQL.DBInstance.establishDBConnection((connectionResponse) => {
    console.log(connectionResponse);
});
