import { ValidationException } from '@core/common/exception/validation.exception';
import { validate } from 'class-validator';

export class ValidatableAdapter {
  public async validate() {
    const errors = await validate(this);

    if (errors.length) {
      throw new ValidationException(errors);
    }
  }
}
