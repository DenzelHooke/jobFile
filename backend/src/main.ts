import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// {
//   cors: { credentials: true, origin: process.env.CLIENT_URL },
// }
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors();
  await app.listen(process.env.PORT ? process.env.PORT : '');
}
bootstrap();
