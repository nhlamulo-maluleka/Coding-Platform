import express, { Express } from "express"

export class ExpressServer {
    private expressApp!: Express

    constructor(port: number | string | undefined = 7890) {
        this.expressApp = express();
        this.setPort(process.env.PORT || port);
    }

    public getExpressApp(): Express {
        return this.expressApp;
    }

    public expressUse(config: any): void {
        this.getExpressApp().use(config)
    }

    public expressUseByKeyValue(confKey: any, confValue: any): void {
        this.getExpressApp().use(confKey, confValue)
    }

    public expressSet(key: string, value: any): void {
        this.getExpressApp().set(key, value)
    }

    public expressGet(key: string): any {
        return this.getExpressApp().get(key)
    }
    
    public setPort(port: number | string | undefined): void {
        this.expressSet("PORT", port);
    }

    public getPort(): number {
        return Number(this.expressGet("PORT"));
    }
}