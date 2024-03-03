import { Domain } from "../../domain";
import multer, { MulterError } from "multer";
import { BadRequestError } from "../../helpers/errors";
import { ErrorCodeMessage } from "../../helpers/errors/error-code-message";
import { NextFunction } from "express";
import _ from "lodash";

const FILE_SIZE_LIMIT = 2 * 1024 * 1024;
const XLXS_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const IMAGE_WHITE_LIST = ["image/png", "image/jpeg", "image/jpg"];

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

const uploadImage = (domain: Domain, fields: multer.Field[]) => {
  return [
    multer({
      fileFilter: (req: any, file: any, callback: any) => {
        if (!_.includes(IMAGE_WHITE_LIST, file.mimetype)) {
          return callback(
            new MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname)
          );
        } else {
          callback(null, true);
        }
      },
      limits: {
        fileSize: FILE_SIZE_LIMIT,
      },
    }).fields(fields),
    (error: Error, req: Request, res: Response, next: NextFunction) => {
      validateErrorMulter(error, domain);
    },
  ];
};

const uploadExcel = (domain: Domain, fields: multer.Field[]) => {
  return [
    multer({
      fileFilter: (req: any, file: any, callback: any) => {
        console.log("file ", file.mimetype);
        if (file.mimetype !== XLXS_TYPE) {
          return callback(
            new MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname)
          );
        } else {
          callback(null, true);
        }
      },
      limits: {
        fileSize: FILE_SIZE_LIMIT,
      },
    }).fields(fields),
    (error: Error, req: Request, res: Response, next: NextFunction) => {
      validateErrorMulter(error, domain);
    },
  ];
};

export const uploadExcelMarketingCampaign = (domain: Domain) => {
  return uploadExcel(domain, [
    {
      name: "file",
      maxCount: 1,
    },
  ]);
};

export const uploadImageBankPartner = (domain: Domain) => {
  return uploadImage(domain, [
    {
      name: "imageFile",
      maxCount: 1,
    },
  ]);
};

export const uploadImageCoupon = (domain: Domain) => {
  return uploadImage(domain, [
    {
      name: "imageFile",
      maxCount: 1,
    },
  ]);
};

export const uploadImagePoc = (domain: Domain) => {
  return uploadImage(domain, [
    {
      name: "logoFile",
      maxCount: 1,
    },
  ]);
};
