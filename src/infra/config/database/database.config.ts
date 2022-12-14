import { IsPort, IsString } from 'class-validator';

export class DatabaseConfig {
  @IsString()
  host: string;

  @IsPort()
  port: string;

  @IsString()
  database: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
