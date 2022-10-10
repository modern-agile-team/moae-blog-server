import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './repository/comments.repository';
import { CommentEntity } from './entity/comment.entity';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, CommentEntity],
})
export class CommentsModule {}
