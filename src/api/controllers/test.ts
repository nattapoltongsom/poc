import { Request, Response, Router as ExpressRouter } from 'express'

import { Router } from '../routes'
export class TestController implements Router {
    constructor() {}

    public route(): ExpressRouter {
        const router = ExpressRouter()
        router.get('/info', this.info)

        return router
    }

    public async info(req: Request, res: Response) {
        res.status(200)
        res.json({
            test: 'ok',
        })
    }
}
