import { NextFunction, Request, Response } from 'express'
import Container, { ProviderName } from '../../infrastructures/di/container'
import { Domain } from '../../domain'
import { ErrorCodeMessage } from '../../helpers/errors/error-code-message'
import _ from 'lodash'
import { AuthorizeError } from '../../helpers/errors/authorize-error'
export default (container: Container) =>
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const ssoAdaptor = container.getInstance(ProviderName.SSO_ADAPTER)
        const bearerHeader = req.headers['authorization'] ?? ''
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        const appIdHeader = req.headers['app-id'] ?? ''
        const appKeyHeader = req.headers['app-key'] ?? ''

        if (appIdHeader === process.env.KERRY_API_HOOK_APP_ID && appKeyHeader === process.env.KERRY_API_HOOK_APP_KEY) {
            next()
        } else {
            if (bearer[0] !== 'Bearer') {
                console.log('Bearer')
                throw new AuthorizeError({
                    domain: Domain.SSO,
                    codeMessage: ErrorCodeMessage.AUTHORIZATION_REQUIRED,
                    message: 'Bearer token is required',
                })
            }

            if (_.isEmpty(bearerToken)) {
                throw new AuthorizeError({
                    domain: Domain.SSO,
                    codeMessage: ErrorCodeMessage.AUTHORIZATION_REQUIRED,
                    message: 'token is required',
                })
            }

            const resp = await ssoAdaptor.validateToken(bearerToken)

            if (resp.active) {
                const clientId = resp.clientId.split('-')[1]
                res.locals.clientId = clientId
                res.locals.scope = resp.scope
                next()
            } else {
                throw new AuthorizeError({
                    domain: Domain.SSO,
                    codeMessage: ErrorCodeMessage.AUTHENTICATION_FAILED,
                    message: 'token is invalid or expired',
                })
            }
        }
    }
