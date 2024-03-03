import { Mapper } from '.'
import { Campaign } from '../../domain/marketing/model'
import { StaticImplements } from '../../helpers/decorators/static-implements'

export interface CampaignSchema {
    id: string
    name: string
    description: string
    organization_code: string
    start_date: Date
    end_date: Date
    status: string
    campaign_type: string
    badge_name: string
    created_date: Date
    updated_date: Date
}

@StaticImplements<Mapper<Campaign, CampaignSchema>>()
export class CampaignMap {
    public static toModel(schema: CampaignSchema): Campaign {
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
        } = schema
        const campaign = new Campaign(name, description, start_date, end_date, status, campaign_type, badge_name)

        return Object.assign(campaign, {
            id,
            createDate: created_date,
            updateDate: updated_date,
        })
    }

    public static toDocument(model: Campaign): CampaignSchema {
        return {
            id: model.getId(),
            name: model.getName(),
            description: model.getDescription(),
            organization_code: model.getOrganizationCode(),
            start_date: model.getStartDate(),
            end_date: model.getEndDate(),
            status: model.getStatus(),
            created_date: model.getCreatedDate(),
            updated_date: model.getUpdatedDate(),
            campaign_type: model.getCampaignType(),
            badge_name: model.getBadgeName(),
        }
    }
}
