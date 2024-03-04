import HttpStatusCode from 'http-status-codes'

import { Domain } from '../../domain'
import { BaseErrorResponse, CustomError } from './custom-error'
import { ErrorCodeMessage } from './error-code-message'

export interface ResourceNotFoundErrorMap {
    domain: Domain
    codeMessage: ErrorCodeMessage
    message: string
    id?: string
    error?: Error
}

interface ResourceNotFoundResponse extends BaseErrorResponse {
    id?: string
}

export class ResourceNotFoundError extends CustomError<ResourceNotFoundResponse> {
    private _domain: Domain
    private _code: ErrorCodeMessage
    private _message: string
    private _id: string

    constructor(errorMap: ResourceNotFoundErrorMap) {
        super(HttpStatusCode.NOT_FOUND, errorMap.error)

        this._domain = errorMap.domain
        this._code = errorMap.codeMessage
        this._message = errorMap.message || ''
        this._id = errorMap.id ?? ''
    }

    public getSchema(): ResourceNotFoundResponse {
        return {
            domain: this._domain,
            code: this._code,
            message: this._message,
            id: this._id,
        }
    }
}
