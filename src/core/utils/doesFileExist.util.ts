import { access } from 'fs/promises';

export const doesFileExist = async (filePath: string): Promise<boolean> => {
  try {
    await access(filePath);

    return true;
  } catch (error: unknown) {
    return false;
  }
};
