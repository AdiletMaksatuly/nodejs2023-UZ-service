import { LogColors } from '../consts/log-colors.const';

export type LogColor = typeof LogColors[keyof typeof LogColors];
