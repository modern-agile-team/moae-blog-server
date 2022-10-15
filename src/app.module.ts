import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BoardModule } from './board/board.module';
import { commentModule } from './comment/comment.module';
import { LikesModule } from './likes/likes.module';
import { ImagesModule } from './images/images.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { RedisConfigService } from './cache/cache.config';

@Module({
  imports: [
    PrismaClient,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    BoardModule,
    commentModule,
    LikesModule,
    ImagesModule,
    AuthModule,
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useClass: RedisConfigService,
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
