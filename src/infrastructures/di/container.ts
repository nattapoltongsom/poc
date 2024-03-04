import _ from 'lodash'
import { ConfigService } from '../../config/service'
import { TestController } from '../../api/controllers/test'

export enum ProviderName {
    CONFIG_SERVICE = 'config',

    // Controller
    ORDER_CONTROLLER = 'controller.order',
    LOGISTICS_CONTROLLER = 'controller.logistics',
    SSO_CONTROLLER = 'controller.sso',
    TEST_CONTROLLER = 'controller.test',

    // Service
    ORDER_SERVICE = 'service.order',

    // Repository
    ORDER_MONGO_REPOSITORY = 'repository.order',
    SUB_ORDER_MONGO_REPOSITORY = 'repository.suborder',

    // Adapter
    SCG_ADAPTER = 'adapter.scg',
    KERRY_ADAPTER = 'adapter.kerry',
    FIRSTER_ADAPTER = 'adapter.firster',
    NODE_MAILER_ADAPTER = 'adapter.nodeMailer',
    LOG_ADAPTER = 'adapter.log',
    SSO_ADAPTER = 'adapter.sso',
}

export default class Container {
    constructor(private readonly instances: any) {}

    public static async initialize(): Promise<Container> {
        const instance: any = {}
        const registerInstance = this.register(instance)

        // Infrastructure
        const configService = new ConfigService()
        //const mongoClient = await new MongoDBClient(configService).getClient()
        //const db = new Database(configService, mongoClient)

        //const logAdaptor = new LogAdaptor(db)
        // const scgAdaptor = new ScgAdaptor(configService.getCourierConfig(), logAdaptor)
        // const kerryAdaptor = new KerryAdaptor(configService.getCourierConfig(), logAdaptor)
        // const nodeMailerEmailAdapter = new NodeMailerEmailAdapter(configService.getNotificationConfig())

        // const ssoAdaptor = new SsoAdaptor(configService.getSsoPlatformConfig(), configService.getSsoConfig())
        // const firsterAdaptor = new FirsterAdaptor(configService.getPlatformConfig(), ssoAdaptor, logAdaptor)

        // Repository
        // const orderRepository = new OrderMongoRepository(db)

        // Service
        // const orderService = new OrderService(
        //     orderRepository,
        //     scgAdaptor,
        //     nodeMailerEmailAdapter,
        //     logAdaptor,
        //     firsterAdaptor,
        //     kerryAdaptor
        // )

        // Controller
        // const orderBofController = new OrderController(orderService)
        // const logisticsController = new LogisticsController(scgAdaptor, logAdaptor)
        // const ssoController = new SsoController(ssoAdaptor)
        const testController = new TestController()

        registerInstance(ProviderName.CONFIG_SERVICE, configService)
        // registerInstance(ProviderName.ORDER_CONTROLLER, orderBofController)
        // registerInstance(ProviderName.LOGISTICS_CONTROLLER, logisticsController)
        registerInstance(ProviderName.TEST_CONTROLLER, testController)

        // registerInstance(ProviderName.SSO_CONTROLLER, ssoController)
        // registerInstance(ProviderName.ORDER_SERVICE, orderService)
        // registerInstance(ProviderName.ORDER_MONGO_REPOSITORY, orderRepository)
        // registerInstance(ProviderName.SCG_ADAPTER, scgAdaptor)
        // registerInstance(ProviderName.KERRY_ADAPTER, kerryAdaptor)
        // registerInstance(ProviderName.NODE_MAILER_ADAPTER, nodeMailerEmailAdapter)
        //registerInstance(ProviderName.LOG_ADAPTER, logAdaptor)
        // registerInstance(ProviderName.SSO_ADAPTER, ssoAdaptor)
        //registerInstance(ProviderName.FIRSTER_ADAPTER, firsterAdaptor)

        return new Container(instance)
    }

    private static register(accumInstance: any) {
        return (name: ProviderName, instance: any): void => {
            _.set(accumInstance, name, instance)
        }
    }

    public getInstance(name: ProviderName) {
        const instance = _.get(this.instances, name)

        if (_.isNil(instance)) {
            throw new Error(`instance: ${name} not found, please register the instance first`)
        }

        const bindAll = () => {
            Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
                .filter((method) => method !== 'constructor' && typeof instance[method] === 'function')
                .forEach((name) => (instance[name] = instance[name].bind(instance)))
        }

        bindAll()

        return instance
    }
}
