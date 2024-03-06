import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../helpers/errors";
import { ErrorCodeMessage } from "../../helpers/errors/error-code-message";

export default () =>
  (error: Error, _: Request, res: Response, __: NextFunction): void => {
    // add logging later
    console.error(error);

    let statusCode = 500;
    let response: any = {
      domain: "Core",
      code: ErrorCodeMessage.INTERNAL_ERROR,
      message: error.message,
    };

    if (error instanceof CustomError) {
      statusCode = error.getStatusCode();
      response = error.getSchema();
    }

    res.status(statusCode).json(response);
  };
