import { IsBoolean, IsPort, IsString } from 'class-validator';

export class ApiConfig {
  @IsPort()
  port: string;

  @IsBoolean()
  isEnableOpenApiDocs: boolean;

  @IsString()
  openApiDocsPath: string;
}
