import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from '@app/common';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { ActionsController } from './actions/actions.controller';
import { ActionsModule } from './actions/actions.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    CommonModule,
    CoursesModule,
    AuthModule,
    ActionsModule,
    CommentsModule
  ],
  controllers: [AppController, ActionsController],
  providers: [AppService],
})
export class AppModule {}
