import moment from "moment";
import { InternalError, ResourceNotFoundError } from "../../helpers/errors";
import {
  Campaign,
  BadgeActiveMarcom,
  LimitOnTopActiveMarketing,
  OrganizationCode,
  UpdateCampaignInput,
  CampaignStatus,
} from "../../domain/marketing/model";
import { CampaignRepository } from "../../domain/marketing/repository";
import { PostgresPool } from "../db/postgres";
import { CampaignMap, CampaignSchema } from "../mappers/campaign";
import { BaseRepository } from "./base";
import { Domain } from "../../domain";
import { BadRequestError } from "../../helpers/errors/bad-request-error";
import { ErrorCodeMessage } from "../../helpers/errors/error-code-message";

export class CampaignPostgresRepository
  extends BaseRepository<Campaign, CampaignSchema>
  implements CampaignRepository
{
  constructor(private readonly db: PostgresPool) {
    super(CampaignMap);
  }

  public async create(model: Campaign): Promise<string> {
    const document = this.mapper.toDocument(model);
    const timestamp = new Date();
    Object.assign(document, {
      created_date: moment(timestamp).format("YYYY-MM-DD HH:mm:ss.SSSSSS"),
      updated_date: moment(timestamp).format("YYYY-MM-DD HH:mm:ss.SSSSSS"),
    });

    const {
      id,
      name,
      description,
      start_date,
      end_date,
      status,
      created_date,
      updated_date,
      campaign_type,
      badge_name,
    } = document;

    const prepare = `INSERT INTO public.campaigns (${Object.keys(
      document
    )}) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`;

    const result = await this.db.query(prepare, [
      id,
      name,
      description,
      "",
      start_date,
      end_date,
      status,
      created_date,
      updated_date,
      campaign_type,
      badge_name,
    ]);

    return result?.shift()?.id;
  }

  public async getAll(): Promise<Campaign[]> {
    const prepare = `
            SELECT * FROM campaigns as c
            order by c.start_date desc
        `;
    const queryCampaign = await this.db.query(prepare);
    return queryCampaign.map((data) => this.mapper.toModel(data));
  }

  public async getActive(): Promise<Campaign[]> {
    const query = await this.db.query(
      `
            SELECT * FROM campaigns as c
            WHERE status = $1 and now() between c.start_date and c.end_date
            order by c.end_date asc`,
      [CampaignStatus.ACTIVE]
    );

    return query.map((data) => this.mapper.toModel(data));
  }

  public async getById(campaignId: string): Promise<Campaign> {
    const campaign = await this.db.findOne(
      `SELECT * FROM public.campaigns WHERE id = $1`,
      [campaignId]
    );

    if (!campaign) {
      throw new ResourceNotFoundError({
        domain: Domain.MARKETING,
        codeMessage: ErrorCodeMessage.RESOURCE_NOT_FOUND,
        message: "Campaign Not Found",
        id: campaignId,
      });
    }

    return this.mapper.toModel(campaign);
  }

  public async getProductBadgeActiveMarcom(
    sku: string
  ): Promise<BadgeActiveMarcom[]> {
    const prepare = `
        SELECT 
            c.badge_name,
            cp.campaign_id, 
            c.name as campaign, 
            c.description,
            cp.limit_on_top,
            cp.product_code,
            c.start_date,
            c.end_date
            
        FROM public.campaigns as c 
        LEFT JOIN public.campaign_products cp  on c.id = cp.campaign_id   
        WHERE  c.status = 'active' and now() between c.start_date and c.end_date
        AND cp.product_code = $1
        AND c.campaign_type = 'marcom'
        
        ORDER BY c.end_date ASC
        `;
    const query = await this.db.query(prepare, [sku]);
    if (!query) {
      return [];
    }
    const resp = query.map((item) => {
      return {
        campaignId: item?.campaign_id,
        name: item?.campaign,
        description: item?.description,
        badge: item?.badge_name,
        limitOnTop: item?.limit_on_top.replace(/\s/g, ""),
        startDate: Math.round(new Date(item?.start_date).getTime() / 1000),
        endDate: Math.round(new Date(item?.end_date).getTime() / 1000),
      };
    });

    return resp;
  }

  public async getBrandBadgeActiveMarcom(
    brandCode: string
  ): Promise<BadgeActiveMarcom[]> {
    const prepare = `
        SELECT 
            c.badge_name,
            cb.campaign_id, 
            c.name as campaign, 
            c.description,
            cb.limit_on_top,
            cb.brand_code,
            c.start_date,
            c.end_date

        FROM  public.campaigns as c 
        LEFT JOIN public.campaign_brands cb on c.id = cb.campaign_id
        WHERE  c.status = 'active' and now() between c.start_date and c.end_date
        AND lower(cb.brand_code) = lower($1)
        AND c.campaign_type = 'marcom'

        ORDER BY c.end_date ASC
        `;

    const query = await this.db.query(prepare, [brandCode]);
    const resp = query.map((item) => {
      return {
        campaignId: item?.campaign_id,
        name: item?.campaign,
        description: item?.description,
        badge: item?.badge_name,
        limitOnTop: item?.limit_on_top.replace(/\s/g, ""),
        startDate: Math.round(new Date(item?.start_date).getTime() / 1000),
        endDate: Math.round(new Date(item?.end_date).getTime() / 1000),
      };
    });

    return resp;
  }

  public async getProductLimitOnTopActiveMarketing(
    sku: string
  ): Promise<LimitOnTopActiveMarketing[]> {
    const prepare = `
            SELECT * from (
                SELECT
                    cp.campaign_id,
                    c.name as campaign,
                    c.description,
                    cp.limit_on_top,
                    cp.product_code,
                    c.start_date,
                    c.end_date

                    FROM public.campaigns as c
                    LEFT JOIN public.campaign_products cp  on c.id = cp.campaign_id
                    WHERE  c.status = 'active' and now() between c.start_date and c.end_date
                    AND c.campaign_type = 'marketing'

            ) as data
            WHERE  product_code = $1
        ORDER BY
            REGEXP_REPLACE(COALESCE(limit_on_top::character varying, '0'), '[^0-9]*' ,'0')::integer desc,
            end_date ASC
        `;
    const query = await this.db.query(prepare, [sku]);
    if (!query) {
      return [];
    }

    const resp = query.map((item) => {
      return {
        campaignId: item?.campaign_id,
        campaignName: item?.campaign,
        campaignDescription: item?.description,
        limitOnTop: item?.limit_on_top.replace(/\s/g, ""),
        remark: "",
        startDate: Math.round(new Date(item?.start_date).getTime() / 1000),
        endDate: Math.round(new Date(item?.end_date).getTime() / 1000),
      };
    });

    return resp;
  }

  public async getBrandLimitOnTopActiveMarketing(
    brandCode: string
  ): Promise<LimitOnTopActiveMarketing[]> {
    const prepare = `
            SELECT * from ( 
                SELECT 
                    cb.campaign_id, 
                    c.name as campaign, 
                    c.description,
                    cb.limit_on_top,
                    cb.brand_code,
                    c.start_date,
                    c.end_date
        
                FROM  public.campaigns as c 
                LEFT JOIN public.campaign_brands cb on c.id = cb.campaign_id
                WHERE  c.status = 'active' and now() between c.start_date and c.end_date
                AND c.campaign_type = 'marketing'
                
            ) as data
            WHERE lower(brand_code) = lower($1)
        ORDER BY 
            REGEXP_REPLACE(COALESCE(limit_on_top::character varying, '0'), '[^0-9]*' ,'0')::integer desc , 
            end_date ASC
        `;
    const query = await this.db.query(prepare, [brandCode]);
    if (!query) {
      return [];
    }

    const resp = query.map((item) => {
      return {
        campaignId: item?.campaign_id,
        campaignName: item?.campaign,
        campaignDescription: item?.description,
        limitOnTop: item?.limit_on_top.replace(/\s/g, ""),
        remark: "",
        startDate: Math.round(new Date(item?.start_date).getTime() / 1000),
        endDate: Math.round(new Date(item?.end_date).getTime() / 1000),
      };
    });

    return resp;
  }

  public async update(input: UpdateCampaignInput): Promise<string> {
    const { id, name, description, startDate, endDate, status, badgeName } =
      input;

    await this.getById(id);

    const prepare = `update public.campaigns
            set
                name = $1,
                description = $2,
                start_date = $3,
                end_date = $4,
                status = $5,
                updated_date = now(),
                badge_name = $6
            where id = $7
            RETURNING id;`;

    try {
      const query = await this.db.query(prepare, [
        name,
        description,
        moment.unix(startDate).format("YYYY-MM-DD HH:mm:ss.SSSSSS"),
        moment.unix(endDate).format("YYYY-MM-DD HH:mm:ss.SSSSSS"),
        status,
        badgeName,
        id,
      ]);

      console.log("id", id);

      return query?.shift().id;
    } catch (error) {
      console.log("error", error);
      throw new InternalError({
        domain: Domain.MARKETING,
        codeMessage: ErrorCodeMessage.INTERNAL_ERROR,
        message: "Campaign can not update",
      });
    }
  }

  public async delete(campaignId: string): Promise<string> {
    const result = await this.db.query(
      `DELETE FROM public.campaigns WHERE id = $1 RETURNING id`,
      [campaignId]
    );

    if (result.length === 0) {
      throw new BadRequestError({
        domain: Domain.MARKETING,
        codeMessage: ErrorCodeMessage.RESOURCE_NOT_FOUND,
        message: `Campaign ID ${campaignId} not found`,
      });
    } else {
      await Promise.all([
        this.db.query(
          `DELETE FROM public.campaign_brands WHERE campaign_id = $1 `,
          [campaignId]
        ),
        this.db.query(
          `DELETE FROM public.campaign_products WHERE campaign_id = $1`,
          [campaignId]
        ),
      ]);
    }

    return result.shift()?.id;
  }
}
