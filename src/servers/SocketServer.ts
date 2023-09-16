import { Server, Socket } from "socket.io"
import { HttpServer } from "./HttpServer";

export class SocketServer {
    private io!: Server;

    constructor(httpServer: HttpServer) {
        this.io = new Server(httpServer.getHttpServer(), {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
    }

    private getIO(): Server {
        return this.io;
    }

    onConnect(namespace: string, callback: Function) {
        this.getIO().of(namespace).on('connection', (socket: Socket) => {
            callback(socket);
        })
    }
}