import HttpStatusCode from "http-status-codes";
import { Domain } from "../../domain";
import { BaseErrorResponse, CustomError } from "./custom-error";
import { ErrorCodeMessage } from "./error-code-message";

export interface BadRequestErrorMap {
  domain: Domain;
  codeMessage: ErrorCodeMessage;
  message: string;
  fields: ErrorField[];
  error?: Error;
}

export interface ErrorField {
  error: string;
  field: string;
}

interface BadRequestResponse extends BaseErrorResponse {
  fields: ErrorField[];
}

export class BadRequestError extends CustomError<BadRequestResponse> {
  private _domain: Domain;
  private _code: ErrorCodeMessage;
  private _message: string;
  private _fields: ErrorField[];

  constructor(errorMap: BadRequestErrorMap) {
    super(HttpStatusCode.BAD_REQUEST, errorMap.error);

    this._domain = errorMap.domain;
    this._code = errorMap.codeMessage;
    this._message = errorMap.message || "";
    this._fields = errorMap.fields;
  }

  public getSchema(): BadRequestResponse {
    return {
      domain: this._domain,
      code: this._code,
      message: this._message,
      fields: this._fields,
    };
  }
}
