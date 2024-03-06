import _ from "lodash";
import { ConfigService } from "../../config/service";
import { TestController } from "../../api/controllers/test";

export enum ProviderName {
  CONFIG_SERVICE = "config",

  // Controller\
  TEST_CONTROLLER = "controller.test",

  // Service

  // Repository

  // Adapter
}

export default class Container {
  constructor(private readonly instances: any) {}

  public static async initialize(): Promise<Container> {
    const instance: any = {};
    const registerInstance = this.register(instance);

    // Infrastructure
    const configService = new ConfigService();

    // Controller
    const testController = new TestController();

    registerInstance(ProviderName.CONFIG_SERVICE, configService);
    registerInstance(ProviderName.TEST_CONTROLLER, testController);

    return new Container(instance);
  }

  private static register(accumInstance: any) {
    return (name: ProviderName, instance: any): void => {
      _.set(accumInstance, name, instance);
    };
  }

  public getInstance(name: ProviderName) {
    const instance = _.get(this.instances, name);

    if (_.isNil(instance)) {
      throw new Error(
        `instance: ${name} not found, please register the instance first`
      );
    }

    const bindAll = () => {
      Object.getOwnPropertyNames(Object.getPrototypeOf(instance))
        .filter(
          (method) =>
            method !== "constructor" && typeof instance[method] === "function"
        )
        .forEach((name) => (instance[name] = instance[name].bind(instance)));
    };

    bindAll();

    return instance;
  }
}
