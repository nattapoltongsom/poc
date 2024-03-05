import {
  Request,
  Response,
  Router as ExpressRouter,
  NextFunction,
  request,
} from "express";

import { Router } from "../routes";
import multer, { MulterError } from "multer";
const upload = multer({ dest: "uploads" });

export class TestController implements Router {
  constructor() {}

  public route(): ExpressRouter {
    const router = ExpressRouter();
    router.get("/info", this.info);
    router.post("/kong", this.info);

    router.post("/upload/images", upload.array("images"), (req, res) => {
      //res.send(req.file);
      console.log(req.files);

      res.json(req.files);
    });
    return router;
  }

  public async info(req: Request, res: Response) {
    res.status(200);
    res.json({
      test: "ok",
    });
  }

  public async create(req: Request, res: Response) {
    console.log("request", req);
    res.status(200);
    res.json({
      test: "ok",
    });
  }

  public uploadExcelTest2() {
    console.log("1");
  }
}

const XLXS_TYPE =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const FILE_SIZE_LIMIT = 2 * 1024 * 1024;

const uploadExcel = (fields: multer.Field[]) => {
  return [
    multer({
      //   fileFilter: (req: any, file: any, callback: any) => {
      //     console.log("file ", file);
      //     if (file.mimetype !== XLXS_TYPE) {
      //       return callback(
      //         new MulterError("LIMIT_UNEXPECTED_FILE", file.fieldname)
      //       );
      //     } else {
      //       callback(null, true);
      //     }
      //   },
      //   limits: {
      //     fileSize: FILE_SIZE_LIMIT,
      //   },
    }).fields(fields),
    (error: Error, req: Request, res: Response, next: NextFunction) => {
      //validateErrorMulter(error, domain);
    },
  ];
};
