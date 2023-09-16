"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const socket_io_1 = require("socket.io");
class SocketServer {
    constructor(httpServer) {
        this.io = new socket_io_1.Server(httpServer.getHttpServer(), {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
    }
    getIO() {
        return this.io;
    }
    onConnect(namespace, callback) {
        this.getIO().of(namespace).on('connection', (socket) => {
            callback(socket);
        });
    }
}
exports.SocketServer = SocketServer;
