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
