import { ResponseCode } from "../../core/types/ResponseCodes";

export class CodeOutputErrorHandler {
    public status!: ResponseCode
    public output!: string;

    constructor(output: string, status: ResponseCode = 400) {
        this.status = status;
        this.output = output;
    }
}