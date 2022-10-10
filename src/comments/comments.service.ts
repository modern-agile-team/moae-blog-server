import { Injectable } from '@nestjs/common';
import { comment, Prisma } from '@prisma/client';
import { CommentsRepository } from './repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async getAll(boardId: number): Promise<comment[]> {
    return await this.commentsRepository.getAll(boardId);
  }

  async create(
    userId: number,
    boardId: number,
    context: string,
  ): Promise<comment> {
    return await this.commentsRepository.create(userId, boardId, context);
  }

  async update(
    userId: number,
    commentId: number,
    context: string,
  ): Promise<Prisma.BatchPayload> {
    return await this.commentsRepository.update(userId, commentId, context);
  }

  async delete(
    userId: number,
    commentId: number,
  ): Promise<Prisma.BatchPayload> {
    return await this.commentsRepository.delete(userId, commentId);
  }
}
