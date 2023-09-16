"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeOutputErrorHandler = void 0;
class CodeOutputErrorHandler {
    constructor(output, status = 400) {
        this.status = status;
        this.output = output;
    }
}
exports.CodeOutputErrorHandler = CodeOutputErrorHandler;
