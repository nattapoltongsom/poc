import _ from "lodash";
import { ConfigService } from "../../config/service";
import { UserService } from "./../../domain/user/service";

import { UserController } from "../../api/controllers/user";

import { PostgresPool } from "../db/postgres";

import { UserPostgresRepository } from "../repositories/user";

export enum ProviderName {
  CONFIG_SERVICE = "config",

  // Controller
  POC_CONTROLLER = "controller.poc",
  ADMIN_CONTROLLER = "controller.admin",
  USER_CONTROLLER = "controller.user",
  AUTHEN_CONTROLLER = "controller.authen",
  CUSTOMER_CONTROLLER = "controller.customer",
  PRODUCT_CONTROLLER = "controller.product",
  MARKETING_CONTROLLER = "controller.marketing",
  BRAND_CONTROLLER = "controller.brand",

  // Service
  ADMIN_SERVICE = "service.admin",
  USER_SERVICE = "service.user",
  CUSTOMER_SERVICE = "service.customer",
  PRODUCT_SERVICE = "service.product",
  MARKETING_SERVICE = "service.marketing",
  BANK_PARTNER_SERVICE = "service.bankPartner",

  // Repository
  USER_POSTGRES_REPOSITORY = "repository.user",
  PRODUCT_POSTGRES_REPOSITORY = "repository.product",

  // Adapter
  FIRSTER_ADAPTER = "adapter.firster",
  S3_ADAPTER = "adapter.s3",
}

export default class Container {
  constructor(private readonly instances: any) {}

  public static async initialize(): Promise<Container> {
    const instance: any = {};
    const registerInstance = this.register(instance);

    // Infrastructure
    const configService = new ConfigService();
    const postgresDB = new PostgresPool(configService.getPostgresDbConfig());

    // Repository
    const userRepository = new UserPostgresRepository(postgresDB);

    // Service
    const userService = new UserService(userRepository);

    // Controller
    const userController = new UserController(userService);

    registerInstance(ProviderName.CONFIG_SERVICE, configService);
    registerInstance(ProviderName.USER_CONTROLLER, userController);
    registerInstance(ProviderName.USER_SERVICE, userService);
    registerInstance(ProviderName.USER_POSTGRES_REPOSITORY, userRepository);

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
