import { Server, createServer } from "http"
import { ExpressServer } from "./ExpressServer";

export class HttpServer {
    private httpServer!: Server;
    private expressServerInstance!: ExpressServer;

    constructor(express: ExpressServer) {
        this.expressServerInstance = express;
        this.httpServer = createServer(this.expressServerInstance.getExpressApp());
    }

    public getHttpServer(): Server {
        return this.httpServer;
    }

    public startServer(): void {
        this.getHttpServer().listen(this.expressServerInstance.getPort(), () => {
            console.log(`Server running on ${this.expressServerInstance.getPort()}`)
        })
    }
}