import { validate } from 'uuid';
import { BadRequestException } from '@nestjs/common';

export const assertValidUuid = (userId: string): void => {
  const isValid = validate(userId);

  if (!isValid) throw new BadRequestException('Invalid user ID');
};
