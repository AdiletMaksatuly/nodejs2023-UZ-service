import { access } from 'fs/promises';

export const doesResourceExist = async (path: string): Promise<boolean> => {
  try {
    await access(path);

    return true;
  } catch (error: unknown) {
    return false;
  }
};
