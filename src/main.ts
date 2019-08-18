import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { PORT } from 'src/constants'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();