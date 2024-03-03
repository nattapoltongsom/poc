import { NextFunction } from 'express'
import { Domain } from '../../domain'
import { BadRequestError, ErrorField } from '../../helpers/errors'
import { ErrorCodeMessage } from '../../helpers/errors/error-code-message'
import _ from 'lodash'
import { ExcelConverter, ExcelDataObject } from '../../helpers/utilities/excelConvert'
import {
    ExcelInitalDataSetting,
    settingCampaigeTypeMarcom,
    settingCampaigeTypeMarketing,
} from '../../domain/marketing/model'
import { CampaignType } from '../../domain/marketing/service'

export const ExcelMarketingImportValidator = () => {
    return (req: any, res: any, next: NextFunction) => {
        try {
            const { files, body } = req
            if (!files.file) {
                throw new BadRequestError({
                    domain: Domain.MARKETING,
                    codeMessage: ErrorCodeMessage.INVALID_INPUT,
                    message: 'File import is required',
                })
            }

            const excelFile = files?.file[0]
            if (!excelFile) {
                throw new BadRequestError({
                    domain: Domain.MARKETING,
                    codeMessage: ErrorCodeMessage.INVALID_INPUT,
                    message: 'File import is invalid',
                })
            }

            let brandCampaignTabData: ExcelDataObject
            let productCampaignTabData: ExcelDataObject

            if (body?.campaignType?.toLocaleLowerCase() === CampaignType.marketing.toLocaleLowerCase()) {
                brandCampaignTabData = sheetConvert(excelFile.buffer, settingCampaigeTypeMarketing[0])
                productCampaignTabData = sheetConvert(excelFile.buffer, settingCampaigeTypeMarketing[1])
            } else if (body?.campaignType?.toLocaleLowerCase() === CampaignType.marcom.toLocaleLowerCase()) {
                brandCampaignTabData = sheetConvert(excelFile.buffer, settingCampaigeTypeMarcom[0])
                productCampaignTabData = sheetConvert(excelFile.buffer, settingCampaigeTypeMarcom[1])
            } else {
                throw new BadRequestError({
                    domain: Domain.MARKETING,
                    codeMessage: ErrorCodeMessage.INVALID_INPUT,
                    message: 'Campaign Type is invalid',
                })
            }

            req.body = { ...req.body, brands: brandCampaignTabData, products: productCampaignTabData }
        } catch (error) {
            if (error instanceof BadRequestError) {
                throw error
            } else {
                throw new BadRequestError({
                    domain: Domain.MARKETING,
                    codeMessage: ErrorCodeMessage.INVALID_INPUT,
                    message: 'File import is invalid',
                    fields: error as ErrorField[],
                })
            }
        }

        next()
    }
}

const sheetConvert = (bufferFile: any, excelSetting: ExcelInitalDataSetting): ExcelDataObject => {
    const { tabName, headerValues } = excelSetting

    const excelConvert = new ExcelConverter({
        bufferFile: bufferFile,
        headRowNumber: 1,
        sheetIndex: tabName,
        headerSelect: headerValues,
    })

    const excelDataObject = excelConvert.getExcelDataObjects()

    validateBlankData(excelDataObject, tabName)
    validateFieldCodeDuplicate(excelDataObject, tabName)

    return excelDataObject
}

const validateBlankData = (excelDataObject: ExcelDataObject, tabName: string): void => {
    if (excelDataObject?.data.length < 0) {
        throw new BadRequestError({
            domain: Domain.MARKETING,
            codeMessage: ErrorCodeMessage.INVALID_INPUT,
            message: `Tab ${tabName} data is required`,
        })
    }
}

const validateFieldCodeDuplicate = (excelexcelDataObject: ExcelDataObject, tabName: string): void => {
    const excelRowValue = excelexcelDataObject?.data?.map((obj) => obj.data[0].value.toLocaleLowerCase())
    const duplicateField = Object.entries(_.countBy(excelRowValue)).reduce((acc: any[], [key, val]) => {
        return val > 1 ? acc.concat(key) : acc
    }, [])

    if (duplicateField.length > 0) {
        throw new BadRequestError({
            domain: Domain.MARKETING,
            codeMessage: ErrorCodeMessage.INVALID_INPUT,
            message: `Tab ${tabName} data invalid`,
            fields: duplicateField.map((name) => {
                return {
                    error: 'duplicate field',
                    field: name,
                }
            }),
        })
    }
}
