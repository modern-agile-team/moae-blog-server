import { BadGatewayException, Injectable } from '@nestjs/common';
import { comment } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsRepository } from './repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<void> {
    const comment: comment = await this.commentsRepository.createComment(
      createCommentDto,
    );

    if (!comment) {
      throw new BadGatewayException('댓글 작성 실패');
    }
  }
}
