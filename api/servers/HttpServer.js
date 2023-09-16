"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpServer = void 0;
const http_1 = require("http");
class HttpServer {
    constructor(express) {
        this.expressServerInstance = express;
        this.httpServer = (0, http_1.createServer)(this.expressServerInstance.getExpressApp());
    }
    getHttpServer() {
        return this.httpServer;
    }
    startServer() {
        this.getHttpServer().listen(this.expressServerInstance.getPort(), () => {
            console.log(`Server running on ${this.expressServerInstance.getPort()}`);
        });
    }
}
exports.HttpServer = HttpServer;
