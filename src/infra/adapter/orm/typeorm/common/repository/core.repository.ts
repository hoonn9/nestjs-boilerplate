import { ObjectLiteral, Repository } from 'typeorm';

export class CoreRepository<T extends ObjectLiteral> {
  constructor(private readonly repository: Repository<T>) {}

  getColumns(): (keyof T)[] {
    return this.repository.metadata.columns.map(
      (col) => col.propertyName,
    ) as (keyof T)[];
  }
}
