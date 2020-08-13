import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  app.useStaticAssets('uploads', {
    prefix:'/uploads'
  })
  const options = new DocumentBuilder()
    .setTitle('视频网站后端api')
    .setDescription('供管理后台使用的api')
    .setVersion('1.0')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('admin-docs', app, document);

  await app.listen(3000);
}
bootstrap();
