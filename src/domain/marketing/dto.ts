import moment from 'moment'
import { Campaign } from './model'

export interface GetCampaignSchema {
    id: string
    name: string
    description: string
    startDate: number
    endDate: number
    status: string
    campaignType: string
    badgeName: string
}

export const getCampaigeSchema = (campaign: Campaign): GetCampaignSchema => {
    return {
        id: campaign.getId(),
        name: campaign.getName(),
        description: campaign.getDescription(),
        startDate: moment(campaign.getStartDate(), 'YYYY-MM-DD HH:mm:ss.SSSSSS').unix(),
        endDate: moment(campaign.getEndDate(), 'YYYY-MM-DD HH:mm:ss.SSSSSS').unix(),
        status: campaign.getStatus(),
        campaignType: campaign.getCampaignType(),
        badgeName: campaign.getBadgeName(),
    }
}
