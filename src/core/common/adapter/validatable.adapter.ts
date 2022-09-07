import { ForbiddenException } from '@nestjs/common';
import { validate } from 'class-validator';

export class ValidatableAdapter {
  async validate<T extends object>(target: T) {
    const errors = await validate(target);
    if (errors) {
      throw new ForbiddenException(errors);
    }
  }
}
