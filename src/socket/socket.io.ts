import { Socket } from "socket.io";
import { SocketServer } from "../servers/SocketServer";
import { HttpServer } from "../servers/HttpServer";

export const initSocketServer = (httpServer: HttpServer) => {
    const ioServer = new SocketServer(httpServer);
    
    ioServer.onConnect("/", (socket: Socket) => {
        console.log(socket.id, "connected");
    
        socket.on("/usercode", (data: string) => {
            socket.broadcast.emit("/updatedUsercode", data)
        })

        socket.on("disconnect", () => {
            console.log(socket.id, "disconnected");
        })
    })
}
