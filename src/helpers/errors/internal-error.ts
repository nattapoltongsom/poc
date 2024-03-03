import HttpStatusCode from 'http-status-codes'
import { Domain } from '../../domain'
import { BaseErrorResponse, CustomError } from './custom-error'
import { ErrorCodeMessage } from './error-code-message'

export interface InternalErrorMap {
    domain: Domain
    codeMessage: ErrorCodeMessage
    message?: string
    error?: Error
}

export class InternalError extends CustomError {
    private _domain: Domain
    private _code: ErrorCodeMessage
    private _message: string

    constructor(errorMap: InternalErrorMap) {
        super(HttpStatusCode.INTERNAL_SERVER_ERROR, errorMap.error)

        this._domain = errorMap.domain
        this._code = errorMap.codeMessage
        this._message = errorMap.message || ''
    }

    public getSchema(): BaseErrorResponse {
        return {
            domain: this._domain,
            code: this._code,
            message: this._message,
        }
    }
}
