import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BaseLogInfo } from '../log-info.interface';

@Injectable()
export class LogMiddleware implements NestMiddleware {
  private logger = new Logger(LogMiddleware.name);

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
    const { url, method } = req;

    const { statusCode } = res;

    const message: BaseLogInfo = {
      method,
      url,
      statusCode,
      ms: Date.now() - start,
    };

    if (statusCode < 400) {
      this.logger.log(message);
    } else if (statusCode < 500) {
      this.logger.warn(message);
    } else {
      this.logger.error(message);
    }
  }
}
