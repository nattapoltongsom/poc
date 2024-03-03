import _ from "lodash";
import { ConfigService } from "../../config/service";
import { MarketingService } from "./../../domain/marketing/service";

import { MarketingController } from "../../api/controllers/marketing";

import { PostgresPool } from "../db/postgres";

import { CampaignPostgresRepository } from "../repositories/campaign";

export enum ProviderName {
  CONFIG_SERVICE = "config",

  // Controller
  MARKETING_CONTROLLER = "controller.marketing",

  // Service
  MARKETING_SERVICE = "service.marketing",

  // Repository
  MARKETING_POSTGRES_REPOSITORY = "repository.user",
}

export default class Container {
  constructor(private readonly instances: any) {}

  public static async initialize(): Promise<Container> {
    const instance: any = {};
    const registerInstance = this.register(instance);

    // Infrastructure
    const configService = new ConfigService();
    const postgresDB = new PostgresPool(configService.getPostgresDbConfig());

    // Adaptor

    // Repository
    const campaignRepository = new CampaignPostgresRepository(postgresDB);
    // Service

    const marketingController = new MarketingController(marketingService);
    const brandController = new BrandController(productService);

    registerInstance(ProviderName.CONFIG_SERVICE, configService);
    registerInstance(ProviderName.MARKETING_SERVICE, marketingService);
    registerInstance(ProviderName.MARKETING_CONTROLLER, marketingController);

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
