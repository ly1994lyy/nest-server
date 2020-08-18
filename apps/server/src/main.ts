import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  const options = new DocumentBuilder()
    .setTitle('视频网站前端&&小程序api')
    .setDescription('供客户端使用的api')
    .addBearerAuth()
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('server-docs', app, document);

  const PORT = process.env.SERVER_PORT || 3001
  await app.listen(PORT);
}
bootstrap();
