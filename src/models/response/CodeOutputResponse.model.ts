import { ResponseCode } from "../../core/types/ResponseCodes";

export class CodeOutputResponse {
    public status!: ResponseCode
    public output!: string;

    constructor(output: string, status: ResponseCode = 200) {
        this.status = status;
        this.output = output;
    }
}