import { Request, Response, Router as ExpressRouter } from "express";
import { Router } from "../routes";
import {
  CreateCampaignInput,
  MarketingService,
} from "../../domain/marketing/service";
import { uploadExcelMarketingCampaign } from "../middlewares/multer-upload-file";
import { ExcelMarketingImportValidator } from "../middlewares/excel-import-validate";
import { Domain } from "../../domain";
import { UpdateCampaignInput } from "../../domain/marketing/model";
import { BankPartnerService } from "../../domain/bankPartner/service";
import { CouponService } from "../../domain/coupon/service";

export class MarketingController implements Router {
  constructor(
    private readonly marketingService: MarketingService,
    private readonly bankPartnerService: BankPartnerService,
    private readonly couponService: CouponService
  ) {}

  public route(): ExpressRouter {
    const router = ExpressRouter();

    router.post(
      "/campaign",
      uploadExcelMarketingCampaign("test"),
      ExcelMarketingImportValidator(),
      this.createCampaign
    );

    return router;
  }

  public async createCampaign(req: Request, res: Response) {
    const {
      name,
      description,
      startDate,
      endDate,
      status,
      brands,
      products,
      campaignType,
      badgeName,
    } = req.body;

    const input: CreateCampaignInput = {
      name,
      description,
      startDate,
      endDate,
      status,
      brands,
      products,
      campaignType,
      badgeName,
    };

    const result = await this.marketingService.createCampaign(input);

    res.status(200);
    res.json({ id: result });
  }
}
