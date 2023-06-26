import { resolve } from 'path';
import { stat } from 'fs/promises';

export const isFileSizeOK = async (
  path: string,
  maxFileSize: number,
): Promise<boolean> => {
  if (!path) return false;
  const pathToFile = resolve(path);

  try {
    const statInfo = await stat(pathToFile);

    return statInfo.size < maxFileSize * 1024;
  } catch (error) {
    return false;
  }
};
