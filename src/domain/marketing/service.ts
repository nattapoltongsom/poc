import { CampaignRepository } from "./repository";
import _ from "lodash";
import { Campaign, UpdateCampaignInput } from "./model";
import moment from "moment";
import { ExcelDataObject } from "../../helpers/utilities/excelConvert";

export enum CampaignType {
  marketing = "marketing",
  marcom = "marcom",
}

export interface CreateCampaignInput {
  name: string;
  description: string;
  startDate: number;
  endDate: number;
  status: string;
  brands: ExcelDataObject;
  products: ExcelDataObject;
  campaignType: CampaignType;
  badgeName: string;
}

export interface GetBankPartnerSchema {
  name: string;
  description: string;
  organizationCode: string;
  startDate: number;
  endDate: number;
  image: string;
  isActive: string;
}

export class MarketingService {
  constructor(private readonly campaignRepo: CampaignRepository) {}

  public async createCampaign(
    createCampaignInput: CreateCampaignInput
  ): Promise<string> {
    const {
      name,
      description,
      startDate,
      endDate,
      status,
      campaignType,
      badgeName,
    } = createCampaignInput;

    const model = new Campaign(
      name,
      description,
      moment.unix(startDate).toDate(),
      moment.unix(endDate).toDate(),
      status,
      campaignType,
      badgeName
    );

    const campaignId = await this.campaignRepo.create(model);

    return campaignId;
  }
}
