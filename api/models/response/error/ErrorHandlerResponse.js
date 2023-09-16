"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerResponse = void 0;
class ErrorHandlerResponse {
    constructor(output, status = 200) {
        this.status = status;
        this.output = output;
    }
}
exports.ErrorHandlerResponse = ErrorHandlerResponse;
