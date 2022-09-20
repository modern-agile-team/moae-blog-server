import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaClient,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    BoardsModule,
    CommentsModule,
    LikesModule,
    ImagesModule,
    AuthModule,
  ],
})
export class AppModule {}
