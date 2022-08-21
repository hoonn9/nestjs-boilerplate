import { ServerApplication } from './application';

async function bootstrap() {
  const app = await ServerApplication.new();
  await app.execute();
}
bootstrap();
