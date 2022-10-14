import { Identifier } from '@core/type/common';
import { v4 } from 'uuid';

export class CoreModel<ID extends Identifier> {
  protected readonly id: ID;
  protected readonly createdAt: Date;
  protected readonly updatedAt: Date;

  constructor(id: ID) {
    this.id = id;
  }

  public static newId() {
    return v4();
  }
}
