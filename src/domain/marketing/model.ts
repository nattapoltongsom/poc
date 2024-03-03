import { v4 as uuid } from 'uuid'
import { Entity } from '../../infrastructures/domain/entity'
import { ExcelHeaderParameter } from '../../helpers/utilities/excelConvert'

export enum OrganizationCode {
    BEAUTY = 'beauty',
    LIFESTYLE = 'lifestyle',
}

export enum CampaignStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

export interface UpdateCampaignInput {
    id: string
    name: string
    description: string
    startDate: number
    endDate: number
    status: string
    badgeName: string
}

export interface ExcelInitalDataSetting {
    tabName: string
    headerValues: ExcelHeaderParameter[]
}

export const settingCampaigeTypeMarketing: ExcelInitalDataSetting[] = [
    {
        tabName: 'brand',
        headerValues: [
            {
                name: 'brand code',
                isValueRequired: true,
            },
            {
                name: 'limit on top',
                isValueRequired: true,
                format: [new RegExp(/(^[1-9][0-9]?$|^100$|exclude)/i)],
            },
        ],
    },
    {
        tabName: 'product',
        headerValues: [
            {
                name: 'product code',
                isValueRequired: true,
            },
            {
                name: 'limit on top',
                isValueRequired: true,
                format: [new RegExp(/(^[1-9][0-9]?$|^100$|exclude)/i)],
            },
        ],
    },
]

export const settingCampaigeTypeMarcom: ExcelInitalDataSetting[] = [
    {
        tabName: 'brand',
        headerValues: [
            {
                name: 'brand code',
                isValueRequired: true,
            },
            {
                name: 'limit on top',
                isValueRequired: false,
                format: [new RegExp(/(^$|exclude)/i)],
            },
        ],
    },
    {
        tabName: 'product',
        headerValues: [
            {
                name: 'product code',
                isValueRequired: true,
            },
            {
                name: 'limit on top',
                isValueRequired: false,
                format: [new RegExp(/(^$|exclude)/i)],
            },
        ],
    },
]

export class Campaign extends Entity {
    private _name: string
    private _description: string
    private _organizationCode: string
    private _startDate: Date
    private _endDate: Date
    private _status: string
    private _campaignType: string
    private _badgeName: string

    constructor(
        name: string,
        description: string,
        startDate: Date,
        endDate: Date,
        status: string,
        campaign_type: string,
        badge_name: string
    ) {
        super()
        this.id = uuid()

        this._name = name
        this._description = description
        this._organizationCode = ''
        this._startDate = startDate
        this._endDate = endDate
        this._status = status
        this._campaignType = campaign_type
        this._badgeName = badge_name
    }

    public getName(): string {
        return this._name
    }

    public setName(name: string) {
        this._name = name
    }

    public getDescription(): string {
        return this._description
    }

    public setDescription(description: string) {
        this._description = description
    }

    public getOrganizationCode(): string {
        return this._organizationCode
    }

    public setOrganizationCode(organizationCode: string) {
        this._organizationCode = organizationCode
    }

    public getStartDate(): Date {
        return this._startDate
    }

    public setStartDate(startDate: Date) {
        this._startDate = startDate
    }

    public getEndDate(): Date {
        return this._endDate
    }

    public setEndDate(endDate: Date) {
        this._endDate = endDate
    }

    public getStatus(): string {
        return this._status
    }

    public setStatus(status: string) {
        this._status = status
    }

    public getCampaignType(): string {
        return this._campaignType
    }

    public setCampaignType(campaign_type: string) {
        this._campaignType = campaign_type
    }

    public getBadgeName(): string {
        return this._badgeName
    }

    public setBadgeName(badge_name: string) {
        this._badgeName = badge_name
    }
}

export class BrandCampaign extends Entity {
    private _campaignId: string
    private _brand: string
    private _masterCategory: string
    private _limitOnTop: string
    private _remark: string

    constructor(campaignId: string, brand: string, masterCategory: string, limitOnTop: string, remark: string) {
        super()
        this.id = uuid()

        this._campaignId = campaignId
        this._brand = brand
        this._masterCategory = masterCategory
        this._limitOnTop = limitOnTop
        this._remark = remark
    }

    public getCampaignId(): string {
        return this._campaignId
    }

    public setCampaignId(campaignId: string) {
        this._campaignId = campaignId
    }

    public getBrand(): string {
        return this._brand
    }

    public setBrand(brand: string) {
        this._brand = brand
    }

    public getMasterCategory(): string {
        return this._masterCategory
    }

    public setMasterCategory(masterCategory: string) {
        this._masterCategory = masterCategory
    }

    public getLimitOnTop(): string {
        return this._limitOnTop
    }

    public setLimitOnTop(limitOnTop: string) {
        this._limitOnTop = limitOnTop
    }

    public getRemark(): string {
        return this._remark
    }

    public setRemark(remark: string) {
        this._remark = remark
    }
}

export interface CampaignResponse {
    id: string
    name: string
    description: string
    organizationCode: string
    startDate: number
    endDate: number
    status: string
}

export interface BadgeActiveMarcom {
    campaignId: string
    name: string
    description: string
    badge: string
    limitOnTop: string
    startDate?: number | null
    endDate?: number | null
}

export interface LimitOnTopActiveMarketing {
    campaignId: string
    campaignName: string
    campaignDescription: string
    limitOnTop: string
    remark: string
    startDate?: number | null
    endDate?: number | null
}
