import { NextFunction } from "express";
import _ from "lodash";
import {
  ExcelConverter,
  ExcelDataObject,
} from "../../helpers/utilities/excelConvert";
import { BadRequestError } from "../../helpers/errors/bad-request-error";
import { ErrorCodeMessage } from "../../helpers/errors/error-code-message";
import { Domain } from "../../domain";
import { ExcelInitalDataSetting, settingImport } from "../../domain/Test/model";

export const ExcelImportValidator = () => {
  return (req: any, res: any, next: NextFunction) => {
    try {
      const { files, body } = req;
      if (!files.file) {
        throw new Error();
      }

      const excelFile = files?.file[0];
      if (!excelFile) {
        throw new Error();
      }

      let data: ExcelDataObject;

      data = sheetConvert(excelFile.buffer, settingImport[0]);

      req.body = {
        ...req.body,
        dataTest: data,
      };
    } catch (error) {
      if (error instanceof BadRequestError) {
        throw error;
      } else {
        throw new Error();
      }
    }

    next();
  };
};

const sheetConvert = (
  bufferFile: any,
  excelSetting: ExcelInitalDataSetting
): ExcelDataObject => {
  const { tabName, headerValues } = excelSetting;

  const excelConvert = new ExcelConverter({
    bufferFile: bufferFile,
    headRowNumber: 1,
    sheetIndex: "data",
    headerSelect: [
      {
        name: "test1",
        isValueRequired: false,
      },
      {
        name: "test2",
        isValueRequired: false,
      },
    ],
  });

  const excelDataObject = excelConvert.getExcelDataObjects();

  validateBlankData(excelDataObject, tabName);
  validateFieldCodeDuplicate(excelDataObject, tabName);

  return excelDataObject;
};

const validateBlankData = (
  excelDataObject: ExcelDataObject,
  tabName: string
): void => {
  if (excelDataObject?.data.length < 0) {
    throw new BadRequestError({
      domain: Domain.TEST,
      codeMessage: ErrorCodeMessage.INVALID_INPUT,
      message: `Tab ${tabName} data is required`,
      fields: [],
    });
  }
};

const validateFieldCodeDuplicate = (
  excelexcelDataObject: ExcelDataObject,
  tabName: string
): void => {
  const excelRowValue = excelexcelDataObject?.data?.map((obj) =>
    obj.data[0].value.toLocaleLowerCase()
  );
  const duplicateField = Object.entries(_.countBy(excelRowValue)).reduce(
    (acc: any[], [key, val]) => {
      return val > 1 ? acc.concat(key) : acc;
    },
    []
  );

  if (duplicateField.length > 0) {
    throw new BadRequestError({
      domain: Domain.TEST,
      codeMessage: ErrorCodeMessage.INVALID_INPUT,
      message: `Tab ${tabName} data invalid`,
      fields: duplicateField.map((name) => {
        return {
          error: "duplicate field",
          field: name,
        };
      }),
    });
  }
};
