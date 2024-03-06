import { Domain } from "../../domain";
import multer, { MulterError } from "multer";
import { ErrorCodeMessage } from "../../helpers/errors/error-code-message";
import { NextFunction } from "express";
import _ from "lodash";
import { BadRequestError } from "../../helpers/errors/bad-request-error";

const FILE_SIZE_LIMIT = 2 * 1024 * 1024;
const XLXS_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

export const enum FileFieldName {
  IMAGE_FILE = "imageFile",
}

const validateErrorMulter = (error: Error, domain: Domain) => {
  if (error instanceof MulterError) {
    throw new BadRequestError({
      domain: domain,
      codeMessage: ErrorCodeMessage.INVALID_INPUT,
      message: error.code,
      fields: [{ field: error.field as string, error: error.code }],
    });
  }
};
