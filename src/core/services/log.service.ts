import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { LogInfo } from '../log-info.interface';
import { LogColors } from '../consts/log-colors.const';
import { LogLevels } from '../consts/log-levels.const';
import { LogLevel } from '../models/log-level.type';
import { LogColor } from '../models/log-color.type';
import { join } from 'path';
import { LOGS_DIR } from '../consts/log-dir.const';
import { appendFile, mkdir, writeFile } from 'fs/promises';
import { doesResourceExist } from '../utils/doesFileExist.util';

@Injectable()
export class LogService implements LoggerService {
  private readonly LEVEL;

  private logFileDir = join(process.cwd(), LOGS_DIR);

  private logFilePath = join(this.logFileDir, `${Date.now()}.log`);
  private errorLogFilePath = join(
    this.logFileDir,
    'errors',
    `${Date.now()}.error.log`,
  );

  constructor(private configService: ConfigService) {
    this.LEVEL = this.configService.get<number>('log.logLevel');

    if (this.LEVEL < 1 || this.LEVEL > 4) {
      throw new Error(
        'Log level must be between 1 and 3 [1 = error, 2 = warn, 3 = log, 4 = verbose]',
      );
    }
  }

  public async error(logInfo: LogInfo): Promise<void> {
    await this.printLog(LogLevels.ERROR, logInfo);
  }

  public async warn(logInfo: LogInfo): Promise<void> {
    if (this.LEVEL < 2) return;

    await this.printLog(LogLevels.WARN, logInfo);
  }

  public async log(logInfo: LogInfo | string): Promise<void> {
    if (this.LEVEL < 3) return;

    await this.printLog(LogLevels.LOG, logInfo);
  }

  public async verbose(logInfo: LogInfo): Promise<void> {
    if (this.LEVEL < 4) return;

    await this.printLog(LogLevels.VERBOSE, logInfo);
  }

  private async printLog(level: LogLevel, logInfo: LogInfo): Promise<void> {
    const color = this.defineColor(level);

    const message = this.generateMessage(logInfo, level, color);

    console.log(message);

    await this.saveLogToFile(message, level === LogLevels.ERROR);
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
        : `${logInfo.method} ${logInfo.url} ${logInfo.statusCode} Query params: ${LogColors.Yellow}${logInfo.query}, ${color}Body: ${LogColors.Yellow}${logInfo.body} ${LogColors.Yellow}+${logInfo.ms}ms`;

    return `${color}[APP] ${PID} - ${LogColors.Regular}${currentTime} ${color}${level} ${message}`;
  }

  private async createLogFile(): Promise<void> {
    const doesDirExist = await doesResourceExist(this.logFileDir);

    if (!doesDirExist) {
      await mkdir(this.logFileDir);
    }

    this.logFilePath = join(this.logFileDir, `${Date.now()}.log`);

    await writeFile(this.logFilePath, 'APP LOGS\n');
  }

  private async createErrorLogFile(): Promise<void> {
    const doesDirExist = await doesResourceExist(this.logFileDir);

    if (!doesDirExist) {
      await mkdir(this.logFileDir);
    }

    this.errorLogFilePath = join(
      this.logFileDir,
      'errors',
      `${Date.now()}.error.log`,
    );

    await writeFile(this.errorLogFilePath, 'APP ERROR LOGS\n');
  }

  private async saveLogToFile(
    message: string,
    isError: boolean,
  ): Promise<void> {
    const logFilePath = isError ? this.errorLogFilePath : this.logFilePath;

    const doesLogFileExist = await doesResourceExist(logFilePath);

    if (!doesLogFileExist) {
      isError ? await this.createErrorLogFile() : await this.createLogFile();
    }

    await appendFile(logFilePath, message + '\n');
  }
}
