import expressValidation, { validate, ValidationError } from 'express-validation'
import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'

import { Domain } from '../../domain'
import { BadRequestError, ErrorField } from '../../helpers/errors/bad-request-error'
import { ErrorCodeMessage } from '../../helpers/errors/error-code-message'

const transformErrorDetail = (detail: expressValidation.errors) => {
    const transformedErrors = Object.entries(detail).map(([key, value]) => {
        const errors = value
        return errors.reduce((accum: any, error: any) => {
            accum.push({
                field: error.context.label,
                error: `${key}: ${error.message}`,
            })
            return accum
        }, [])
    })

    return transformedErrors.flat()
}

export default (validationSchema: expressValidation.schema, domain: Domain) => {
    return [
        validate(validationSchema, { keyByField: false, statusCode: 400 }, { abortEarly: false }),
        (error: Error, req: Request, res: Response, next: NextFunction) => {
            if (error instanceof ValidationError) {
                const fields: ErrorField[] = transformErrorDetail(error.details)
                throw new BadRequestError({
                    domain: domain,
                    codeMessage: ErrorCodeMessage.INVALID_INPUT,
                    message: 'validate input fail',
                    fields: fields,
                })
            }

            next(error)
        },
    ]
}
