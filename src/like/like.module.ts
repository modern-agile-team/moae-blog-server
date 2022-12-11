import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikesRepository } from './repository/likes.repository';
import { LikeEntity } from './like.entity';

@Module({
  controllers: [LikeController],
  providers: [LikeService, LikesRepository, LikeEntity],
})
export class LikeModule {}
