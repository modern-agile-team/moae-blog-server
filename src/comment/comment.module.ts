import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './repository/comment.repository';
import { CommentEntity } from './comment.entity';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository, CommentEntity],
})
export class CommentModule {}
