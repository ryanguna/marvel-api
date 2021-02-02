/**
 * Module Dependencies
 */
import { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';

import Logger from '@lib/logger';
import HttpError from 'error/HttpError';

/**
 * Middleware class to handle all api errors
 *
 * @default
 * @memberOf ErrorMiddleware
 */
export default class ErrorMiddleware {
  /**
   * Logs and formats app errors
   *
   * @static
   * @param error HttpError
   * @param request Request
   * @param response Response
   * @param next NextFunction
   * @returns Promise<Response>
   * @memberOf ErrorMiddleware
   */
  public static async handle(
    error: HttpError,
    request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<Response> {
    const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
    const message =
      status === StatusCodes.INTERNAL_SERVER_ERROR
        ? 'Internal Server Error'
        : error.message;

    if (status === StatusCodes.INTERNAL_SERVER_ERROR) {
      await Logger.error(error);
    }

    return response.status(status).json({
      status,
      message,
      errors: error.errors,
    });
  }
}
