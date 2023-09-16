"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeOutputResponse = void 0;
class CodeOutputResponse {
    constructor(output, status = 200) {
        this.status = status;
        this.output = output;
    }
}
exports.CodeOutputResponse = CodeOutputResponse;
