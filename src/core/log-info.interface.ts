export interface BaseLogInfo {
  method: string;
  url: string;
  statusCode: number;
  ms: number;
  query?: string;
  body?: string;
}

export type LogInfo = BaseLogInfo | string;
