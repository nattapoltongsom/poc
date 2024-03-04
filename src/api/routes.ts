import { Router as ExpressRouter, Response } from 'express'

import Container, { ProviderName } from '../infrastructures/di/container'
import { TestController } from './controllers/test'

export interface Router {
    route(): ExpressRouter
}

const registedRouter = (container: Container): ExpressRouter => {
    const router = ExpressRouter({ caseSensitive: false })

    // const orderController: OrderController = container.getInstance(ProviderName.ORDER_CONTROLLER)
    // const logisticsController: LogisticsController = container.getInstance(ProviderName.LOGISTICS_CONTROLLER)
    // const ssoController: SsoController = container.getInstance(ProviderName.SSO_CONTROLLER)
    const testController: TestController = container.getInstance(ProviderName.TEST_CONTROLLER)

    router.get('/health', (_, res: Response) => res.sendStatus(200))
    router.get('/APP_COMMIT_ID', (_, res: Response) => {
        res.status(200)
        res.json({
            APP_COMMIT_ID: process.env.APP_COMMIT_ID,
        })
    })

    router.use('/tests', testController.route())

    return router
}

export default registedRouter
