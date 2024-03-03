import { Joi } from "express-validation";
import _ from "lodash";
import { CampaignStatus } from "../../domain/marketing/model";

export const CampaignUpdateSchema = {
  body: Joi.object({
    name: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    startDate: Joi.number().required(),
    endDate: Joi.number().required(),
    status: Joi.valid(...Object.values(CampaignStatus)).required(),
    badgeName: Joi.string().optional(),
  }),
};
