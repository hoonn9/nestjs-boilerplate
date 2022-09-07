import { IsPort } from 'class-validator';

export class ApiConfig {
  @IsPort()
  port: string;
}
