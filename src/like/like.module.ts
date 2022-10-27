import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikesRepository } from './repository/likes.repository';

@Module({
  controllers: [LikeController],
  providers: [LikeService, LikesRepository],
})
export class LikeModule {}
