export interface BaseLogInfo {
  method: string;
  url: string;
  statusCode: number;
  ms: number;
}

export type LogInfo = BaseLogInfo | string;
