import { ForbiddenException } from '@nestjs/common';
import { validate } from 'class-validator';

export class ValidatableAdapter {
  public async validate() {
    const errors = await validate(this);
    if (errors.length) {
      throw new ForbiddenException(errors);
    }
  }
}
