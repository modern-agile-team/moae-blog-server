import { BadGatewayException, Injectable } from '@nestjs/common';
import { comment } from '@prisma/client';
import { CommentsRepository } from './repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async selectAllComments(boardId: number): Promise<comment[]> {
    return await this.commentsRepository.selectAllComment(boardId);
  }

  async createComment(
    userId: number,
    boardId: number,
    context: string,
  ): Promise<comment> {
    return await this.commentsRepository.createComment(
      userId,
      boardId,
      context,
    );
  }

  async updateComment(commentId: number, context: string): Promise<void> {
    const comment: comment = await this.commentsRepository.updateComment(
      commentId,
      context,
    );

    if (!Object.keys(comment).length) {
      throw new BadGatewayException('댓글 수정 실패');
    }
  }

  async deleteComment(commentId: number): Promise<void> {
    const comment: comment = await this.commentsRepository.deleteComment(
      commentId,
    );

    if (!Object.keys(comment).length) {
      throw new BadGatewayException('댓글 삭제 실패');
    }
  }
}
