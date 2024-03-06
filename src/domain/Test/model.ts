import { v4 as uuid } from "uuid";
import { Entity } from "../../infrastructures/domain/entity";
import { ExcelHeaderParameter } from "../../helpers/utilities/excelConvert";

export enum OrganizationCode {
  BEAUTY = "beauty",
  LIFESTYLE = "lifestyle",
}

export enum CampaignStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export interface UpdateCampaignInput {
  id: string;
  name: string;
  description: string;
  startDate: number;
  endDate: number;
  status: string;
  badgeName: string;
}

export interface ExcelInitalDataSetting {
  tabName: string;
  headerValues: ExcelHeaderParameter[];
}

export const settingImport: ExcelInitalDataSetting[] = [
  {
    tabName: "data",
    headerValues: [
      {
        name: "test1",
        isValueRequired: true,
      },
      {
        name: "test2",
        isValueRequired: true,
      },
    ],
  },
];
