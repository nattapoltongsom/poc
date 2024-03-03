import { NextFunction, Request, Response } from 'express'
import Container, { ProviderName } from '../../infrastructures/di/container'
import { ErrorCodeMessage } from '../../helpers/errors/error-code-message'
import { Domain } from '../../domain'
import { AuthorizeError } from '../../helpers/errors/authorize-error'
import * as jwt from 'jsonwebtoken'
import _ from 'lodash'

interface JWTInterface {
    id: string
    firstname: string
    lastname: string
    roles: string[]
    iat: number
    exp: number
}
export default (container: Container, roleArray: string[]) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const configService = container.getInstance(ProviderName.CONFIG_SERVICE)

        const { secret } = configService.getJWTSecret()
        const bearerHeader = req.headers['authorization'] ?? ''
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        if (bearer[0] !== 'Bearer') {
            throw new AuthorizeError({
                domain: Domain.CORE,
                codeMessage: ErrorCodeMessage.AUTHORIZATION_REQUIRED,
                message: 'Bearer token is required',
            })
        }

        if (_.isEmpty(bearerToken)) {
            throw new AuthorizeError({
                domain: Domain.CORE,
                codeMessage: ErrorCodeMessage.AUTHORIZATION_REQUIRED,
                message: 'token is required',
            })
        }
        const decoded = jwt.verify(bearerToken, secret) as JWTInterface

        try {
            if (Date.now() >= decoded.exp * 1000) {
                throw new AuthorizeError({
                    domain: Domain.CORE,
                    codeMessage: ErrorCodeMessage.AUTHENTICATION_FAILED,
                    message: 'token is expired',
                })
            }
        } catch (err) {
            throw new AuthorizeError({
                domain: Domain.CORE,
                codeMessage: ErrorCodeMessage.AUTHENTICATION_FAILED,
                message: 'token is invalid',
            })
        }

        try {
            const jwtRoles = decoded.roles
            roleArray.forEach((r) => {
                if (jwtRoles.includes(r) === false) {
                    throw new Error('token not authorized to access this resource')
                }
            })
        } catch (e) {
            const message = (e as Error).message
            throw new AuthorizeError({
                domain: Domain.CORE,
                codeMessage: ErrorCodeMessage.AUTHENTICATION_FAILED_USER_NOT_ALLOW,
                message,
            })
        }
        res.locals.userId = decoded.id

        next()
    }
