import {
  Request,
  Response,
  Router as ExpressRouter,
  NextFunction,
} from "express";
import { Router } from "../routes";
import multer, { MulterError } from "multer";
import { ExcelImportValidator } from "../middlewares/excel-import-validate";
import { BadRequestError } from "../../helpers/errors/bad-request-error";
import { ErrorCodeMessage } from "../../helpers/errors/error-code-message";
import { Domain } from "../../domain";

const FILE_SIZE_LIMIT = 2 * 1024 * 1024;
const XLXS_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

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

export class TestController implements Router {
  constructor() {}

  public route(): ExpressRouter {
    const router = ExpressRouter();
    router.post(
      "/upload",
      this.uploadExcelTest(),
      ExcelImportValidator(),
      this.create
    );
    return router;
  }

  public async create(req: Request, res: Response) {
    console.log("is body", req.body);
    req.body.dataTest.data.forEach((data: any) => {
      console.log("data in array", data);
    });

    req.body.dataTest.header.forEach((data: any) => {
      console.log("header in array", data);
    });

    res.status(200);
    res.json({ result: req.body });
  }

  public uploadExcelTest = () => {
    return uploadExcel([
      {
        name: "file",
        maxCount: 10,
      },
    ]);
  };
}

export const uploadExcel = (fields: multer.Field[]) => {
  return [
    multer({
      fileFilter: (req: any, file: any, callback: any) => {
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
      validateErrorMulter(error, Domain.TEST);
    },
  ];
};
