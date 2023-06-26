import { LogLevels } from '../consts/log-levels.const';

export type LogLevel = typeof LogLevels[keyof typeof LogLevels];
