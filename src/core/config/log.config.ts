import { registerAs } from '@nestjs/config';

const DEFAULT_LOG_LEVEL = 4;

export default registerAs('log', () => ({
  logLevel: parseInt(process.env.LOG_LEVEL) || DEFAULT_LOG_LEVEL,
}));
