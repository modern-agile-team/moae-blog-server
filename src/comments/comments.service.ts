import { Injectable } from '@nestjs/common';
import { comment, Prisma } from '@prisma/client';
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

  async updateComment(
    userId: number,
    commentId: number,
    context: string,
  ): Promise<Prisma.BatchPayload> {
    return await this.commentsRepository.updateComment(
      userId,
      commentId,
      context,
    );
  }

  async deleteComment(
    userId: number,
    commentId: number,
  ): Promise<Prisma.BatchPayload> {
    return await this.commentsRepository.deleteComment(userId, commentId);
  }
}
