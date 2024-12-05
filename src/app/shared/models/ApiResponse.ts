import { IApiResponse } from "./Contracts/IApiResponse";

export class ApiResponse implements IApiResponse {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}