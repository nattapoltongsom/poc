import { NextFunction, Request, Response } from 'express'
import { isNil, isEmpty, isNaN, toNumber } from 'lodash'
import * as appInsights from 'applicationinsights'
import Container, { ProviderName } from '../../infrastructures/di/container'

export const setAppInsightContext =
    (client: appInsights.TelemetryClient) =>
    (req: Request, res: Response, next: NextFunction): void => {
        if (!isNil(client)) {
            client.trackNodeHttpRequest({ request: req, response: res })
        }
        next()
    }
export const initializeAppInsight = (container: Container) => {
    const configService = container.getInstance(ProviderName.CONFIG_SERVICE)
    const { key, roleName, developerMode, samplingPercentage } = configService.getAppInsightsConfig()
    appInsights
        .setup(key)
        .setAutoDependencyCorrelation(true)
        .setAutoCollectRequests(true)
        .setAutoCollectPerformance(true)
        .setAutoCollectExceptions(true)
        .setAutoCollectDependencies(true)
        .setAutoCollectConsole(true)
        .setUseDiskRetryCaching(true)
        .setInternalLogging(developerMode, developerMode)
        .setDistributedTracingMode(appInsights.DistributedTracingModes.AI_AND_W3C)
        .start()

    const client: appInsights.TelemetryClient = appInsights.defaultClient
    client.context.tags[client.context.keys.cloudRole] = roleName
    if (!isEmpty(samplingPercentage)) {
        const convertedSamplingPercentage: number = toNumber(samplingPercentage)
        const isInRange = convertedSamplingPercentage >= 0 && convertedSamplingPercentage <= 100

        client.config.samplingPercentage =
            !isNaN(convertedSamplingPercentage) && isInRange ? convertedSamplingPercentage : 100
    }
    return client
}
