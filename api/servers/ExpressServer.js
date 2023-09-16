"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressServer = void 0;
const express_1 = __importDefault(require("express"));
class ExpressServer {
    constructor(port = 7890) {
        this.expressApp = (0, express_1.default)();
        this.setPort(process.env.PORT || port);
    }
    getExpressApp() {
        return this.expressApp;
    }
    expressUse(config) {
        this.getExpressApp().use(config);
    }
    expressUseByKeyValue(confKey, confValue) {
        this.getExpressApp().use(confKey, confValue);
    }
    expressSet(key, value) {
        this.getExpressApp().set(key, value);
    }
    expressGet(key) {
        return this.getExpressApp().get(key);
    }
    setPort(port) {
        this.expressSet("PORT", port);
    }
    getPort() {
        return Number(this.expressGet("PORT"));
    }
}
exports.ExpressServer = ExpressServer;
