import { LimitOnTopActiveMarketing, BrandCampaign, Campaign, UpdateCampaignInput, BadgeActiveMarcom } from './model'

export interface CampaignRepository {
    create(model: Campaign): Promise<string>
    getAll(): Promise<Campaign[]>
    getById(campaignId: string): Promise<Campaign>
    getActive(): Promise<Campaign[]>
    getBrandLimitOnTopActiveMarketing(brandCode: string): Promise<LimitOnTopActiveMarketing[]>
    getProductLimitOnTopActiveMarketing(sku: string): Promise<LimitOnTopActiveMarketing[]>
    getBrandBadgeActiveMarcom(brandCode: string): Promise<BadgeActiveMarcom[]>
    getProductBadgeActiveMarcom(sku: string): Promise<BadgeActiveMarcom[]>
    update(input: UpdateCampaignInput): Promise<string>
    delete(campaignId: string): Promise<string>
}

export interface BrandCampaignRepository {
    createBatch(models: BrandCampaign[]): Promise<any>
}
