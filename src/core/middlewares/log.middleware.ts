import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BaseLogInfo } from '../log-info.interface';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private logger = new Logger(LogMiddleware.name);

  private CLIENT_ERROR_STATUS_CODE = 400;

  private SERVER_ERROR_STATUS_CODE = 500;

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => this.logRequest({ start, req, res }));

    next();
  }

  private logRequest({
    start,
    req,
    res,
  }: {
    start: number;
    req: Request;
    res: Response;
  }): void {
    const { url, method, query, body } = req;

    const { statusCode } = res;

    const message: BaseLogInfo = {
      method,
      url,
      query: JSON.stringify(query),
      body: JSON.stringify(body),
      statusCode,
      ms: Date.now() - start,
    };

    switch (true) {
      case this.isClientError(statusCode):
        this.logger.warn(message);
        break;
      case this.isServerError(statusCode):
        this.logger.error(message);
        break;
      default:
        this.logger.log(message);
    }
  }

  private isClientError(statusCode: number): boolean {
    return (
      statusCode >= this.CLIENT_ERROR_STATUS_CODE &&
      statusCode < this.SERVER_ERROR_STATUS_CODE
    );
  }

  private isServerError(statusCode: number): boolean {
    return statusCode >= this.SERVER_ERROR_STATUS_CODE;
  }
}
