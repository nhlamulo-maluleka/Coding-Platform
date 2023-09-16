"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketServer = void 0;
const SocketServer_1 = require("../servers/SocketServer");
const initSocketServer = (httpServer) => {
    const ioServer = new SocketServer_1.SocketServer(httpServer);
    ioServer.onConnect("/", (socket) => {
        console.log(socket.id, "connected");
        socket.on("/usercode", (data) => {
            socket.broadcast.emit("/updatedUsercode", data);
        });
        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        });
    });
};
exports.initSocketServer = initSocketServer;
