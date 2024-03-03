import _ from 'lodash'
import xlsx from 'xlsx'
import { ErrorField } from '../errors'

export interface ExcelHeaderName {
    name: string
    isValueRequired: boolean
}

export interface ExcelDataHeader {
    name: string
    key: string
    isValueRequire: boolean
    formats?: RegExp[]
}

export interface ExcelRow {
    key: string
    value: string
}

export interface ExcelDataRow {
    rowNumber: number
    data: ExcelRow[]
}

export interface ExcelDataObject {
    header: ExcelDataHeader[]
    data: ExcelDataRow[]
}

export interface ExcelHeaderParameter {
    name: string
    isValueRequired: boolean
    format?: RegExp[]
}

export interface ExcelConvertConstructorParameter {
    bufferFile: any
    headRowNumber: number
    sheetIndex: string
    headerSelect: ExcelHeaderParameter[]
}

export class ExcelConverter {
    private _headRowNumber: number
    private _jsonSheet: unknown[]
    private _excelDataHeader: ExcelDataHeader[]
    private _excelDataRow: ExcelDataRow[]
    private _headerSelect: ExcelHeaderParameter[]

    public constructor(params: ExcelConvertConstructorParameter) {
        const { bufferFile, headRowNumber, sheetIndex, headerSelect } = params

        this._headRowNumber = headRowNumber
        this._excelDataHeader = []
        this._excelDataRow = []
        this._headerSelect = headerSelect

        try {
            const workbook = xlsx.read(bufferFile)
            const indexOftab = workbook.SheetNames.findIndex(
                (e) => e.toLocaleLowerCase() === sheetIndex.toLocaleLowerCase()
            )
            const sheet = workbook.Sheets[workbook.SheetNames[indexOftab]]

            this._jsonSheet = xlsx.utils.sheet_to_json(sheet, {
                rawNumbers: false,
                blankrows: false,
                raw: true,
                header: this._headRowNumber,
            })
        } catch (e) {
            throw {
                error: `export file is something went wrong: ${e}`,
            }
        }
    }

    public getExcelDataObjects(): ExcelDataObject {
        this._excelDataHeader = this.getHeaderData()
        this._excelDataRow = this.getBodyData()

        if (this._headerSelect.length > 1) {
            return this.headerSelectDataObject()
        } else {
            return {
                header: this._excelDataHeader,
                data: this._excelDataRow,
            }
        }
    }

    private getHeaderData(): ExcelDataHeader[] {
        const header = Object.entries(this._jsonSheet.shift() as any)
        return header.map((e) => {
            return {
                key: e?.[0] as string,
                name: e?.[1] as string,
                isValueRequire: false,
                formats: [],
            }
        })
    }

    private getBodyData(): ExcelDataRow[] {
        const excelDataRow: ExcelDataRow[] = []

        this._jsonSheet?.map((rows: any, index: number) => {
            const dataObject: ExcelDataRow = {
                rowNumber: this._headRowNumber + index + 1,
                data: [],
            }

            const keys = Object.keys(rows)

            keys?.map((key) => {
                const excelRow: ExcelRow = {
                    key,
                    value: rows[key],
                }
                dataObject.data.push(excelRow)
            })
            excelDataRow.push(dataObject)
        })

        return excelDataRow
    }

    private headerSelectDataObject(): ExcelDataObject {
        const headerNameSelect = this._headerSelect.map((e) => e.name.toLocaleLowerCase())
        const headerRequire = this._headerSelect.filter((e) => e.isValueRequired === true)
        const headerNameRequire = headerRequire.map((e) => e.name.toLocaleLowerCase())
        const headerFormat = this._headerSelect.filter((e) => e.format != undefined)

        const columnError = this.validateColumn(headerNameSelect)

        if (columnError.length > 0) {
            throw columnError
        }

        const header = this._excelDataHeader
            .filter((e) => headerNameSelect.includes(e.name.toLocaleLowerCase()))
            .map((row) => {
                const isRequire = headerNameRequire.includes(row.name.toLocaleLowerCase())
                if (isRequire) {
                    row = { ...row, isValueRequire: true }
                }

                const formats = headerFormat.find((e) => e.name.toLocaleLowerCase() === row.name.toLocaleLowerCase())
                if (formats) {
                    row = { ...row, formats: formats.format }
                }

                return row
            })

        this._excelDataHeader = header

        const headerKeys = header.map((e) => e.key)

        const data = this._excelDataRow.map((row) => {
            const dataRows: ExcelDataRow = {
                data: [],
                rowNumber: row.rowNumber,
            }

            headerKeys.map((key) => {
                const findRow = row.data.find((e) => e.key === key)
                if (findRow) {
                    dataRows.data.push({
                        key: findRow.key,
                        value: findRow.value,
                    })
                } else {
                    dataRows.data.push({
                        key: key,
                        value: '',
                    })
                }
            })
            return dataRows
        })

        const requireRowError = this.validateRow(data)

        if (requireRowError.length > 0) {
            throw requireRowError
        }

        return {
            header: header,
            data: data,
        }
    }

    private validateRow(rows: ExcelDataRow[]) {
        const errorField: ErrorField[] = []

        rows.map((row) => {
            const { rowNumber, data } = row
            data.map((rowValue) => {
                const { key, value } = rowValue
                const columm = this._excelDataHeader.find((e) => e.key === key)
                if (columm?.isValueRequire && value == '') {
                    errorField.push({
                        field: `${columm?.name}`,
                        error: `field is require at row number ${rowNumber}`,
                    })
                }

                if (columm?.formats != undefined && columm?.formats.length > 0) {
                    const test = columm?.formats.map((format) => {
                        return format.test(value.trim())
                    }).some(data => data === true)

                    if(!test){
                        errorField.push({
                            field: `${columm?.name}`,
                            error: `field value is invalid format at row number ${rowNumber}`,
                        }) 
                    }
                }
            })
        })
        return errorField
    }

    private validateColumn(headerName: string[]): ErrorField[] {
        const headerRequire = _.difference(
            headerName,
            this._excelDataHeader?.map((e) => e.name.toLocaleLowerCase())
        )

        return headerRequire?.map((name) => {
            return {
                field: name,
                error: 'Column name is require',
            }
        })
    }
}
