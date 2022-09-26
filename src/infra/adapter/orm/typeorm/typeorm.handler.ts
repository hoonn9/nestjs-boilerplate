import { DatabaseHandler } from '@core/common/handler/database/database.handler';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

export class TypeOrmDatabaseHandler implements DatabaseHandler {
  constructor(
    @InjectDataSource()
    private readonly dataSoruce: DataSource,
  ) {}

  async drop(): Promise<void> {
    await this.dataSoruce.dropDatabase();
  }
}
