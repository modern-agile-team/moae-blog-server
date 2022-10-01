import { CacheModule, Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import * as redisStore from 'cache-manager-ioredis';

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
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: 6379,
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
