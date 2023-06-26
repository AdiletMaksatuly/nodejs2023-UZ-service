import { registerAs } from '@nestjs/config';

const DEFAULT_LOG_LEVEL = 4;
const DEFAULT_MAX_FILE_SIZE = 1024;

export default registerAs('log', () => ({
  logLevel: parseInt(process.env.LOG_LEVEL) || DEFAULT_LOG_LEVEL,
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || DEFAULT_MAX_FILE_SIZE,
}));
