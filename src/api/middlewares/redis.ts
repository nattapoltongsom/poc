import { NextFunction, Request, Response } from 'express'
import Container, { ProviderName } from '../../infrastructures/di/container'
import { Redis } from '../../infrastructures/db/redis'
export default (container: Container) =>
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const configService = container.getInstance(ProviderName.CONFIG_SERVICE)
        const { uri, cache } = configService.getRedisConfig()

        if (cache) {
            const allowPath = [
                { method: 'GET', regex: new RegExp('(/customer/[0-9a-z].*)', 'g') },
                { method: 'GET', regex: new RegExp('/brand/list', 'g') },
            ]
            const httpMethod = req.method
            const endpoint = req.originalUrl
            const redis = new Redis({ uri })
            for (const data of allowPath) {
                const { method, regex } = data

                if (regex.test(endpoint) && httpMethod.toLowerCase() && method.toLowerCase()) {
                    const getKey = await redis.getString(endpoint)
                    if (getKey) {
                        return res.json({ data: JSON.parse(getKey) })
                    }
                }
            }
        }

        next()
    }
