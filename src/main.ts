import { ServerApplication } from '@application/server';

async function bootstrap() {
  const app = await ServerApplication.new();
  await app.execute();
}
bootstrap();
