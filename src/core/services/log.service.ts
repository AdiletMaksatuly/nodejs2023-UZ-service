import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogInfo } from '../log-info.interface';
import { LogColors } from '../consts/log-colors.const';
import { LogLevels } from '../consts/log-levels.const';
import { LogLevel } from '../models/log-level.type';
import { LogColor } from '../models/log-color.type';

@Injectable()
export class LogService implements LoggerService {
  private readonly LEVEL;

  constructor(private configService: ConfigService) {
    this.LEVEL = this.configService.get<number>('log.logLevel');

    if (this.LEVEL < 1 || this.LEVEL > 4) {
      throw new Error(
        'Log level must be between 1 and 3 [1 = error, 2 = warn, 3 = log, 4 = verbose]',
      );
    }
  }

  public error(logInfo: LogInfo): void {
    this.printLog(LogLevels.ERROR, logInfo);
  }

  public warn(logInfo: LogInfo): void {
    if (this.LEVEL < 2) return;

    this.printLog(LogLevels.WARN, logInfo);
  }

  public log(logInfo: LogInfo | string): void {
    if (this.LEVEL < 3) return;

    this.printLog(LogLevels.LOG, logInfo);
  }

  public verbose(logInfo: LogInfo): void {
    if (this.LEVEL < 4) return;

    this.printLog(LogLevels.VERBOSE, logInfo);
  }

  private printLog(level: LogLevel, logInfo: LogInfo): void {
    const color = this.defineColor(level);

    console.log(this.generateMessage(logInfo, level, color));
  }

  private getCurrentTimeString(): string {
    return new Date().toLocaleString();
  }

  private defineColor(level: LogLevel): LogColor {
    switch (level) {
      case LogLevels.ERROR:
        return LogColors.Red;
      case LogLevels.WARN:
        return LogColors.Yellow;
      case LogLevels.LOG:
        return LogColors.Green;
      case LogLevels.VERBOSE:
        return LogColors.Green;
      default:
        const exhaustiveCheck: never = level;

        return exhaustiveCheck;
    }
  }

  private generateMessage(
    logInfo: LogInfo,
    level: LogLevel,
    color: LogColor,
  ): string {
    const currentTime = this.getCurrentTimeString();
    const PID = process.pid;

    const message =
      typeof logInfo === 'string'
        ? logInfo
        : `${logInfo.method} ${logInfo.url} ${logInfo.statusCode} ${LogColors.Yellow}+${logInfo.ms}ms`;

    return `${color}[APP] ${PID} - ${LogColors.Regular}${currentTime} ${color}${level} ${message}`;
  }
}
