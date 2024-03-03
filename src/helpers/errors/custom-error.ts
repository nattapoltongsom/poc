import { Domain } from '../../domain'
import { ErrorCodeMessage } from './error-code-message'

export interface BaseErrorResponse {
    domain: Domain
    code: ErrorCodeMessage
    message: string
}

export abstract class CustomError<E extends BaseErrorResponse = BaseErrorResponse> extends Error {
    private _statusCode: number

    constructor(statusCode: number, error?: Error) {
        super()

        this._statusCode = statusCode
        this.stack = error?.stack
    }

    public getStatusCode(): number {
        return this._statusCode
    }

    public abstract getSchema(): E
}
