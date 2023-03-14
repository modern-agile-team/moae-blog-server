import { Injectable } from '@nestjs/common';
import { comment, Prisma } from '@prisma/client';
import { CommentRepository } from './comment.repository';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async getAll(boardId: number): Promise<comment[]> {
    return await this.commentRepository.getAll(boardId);
  }

  async create(userId: number, boardId: number, context: string): Promise<comment> {
    return await this.commentRepository.create(userId, boardId, context);
  }

  async update(userId: number, commentId: number, context: string): Promise<Prisma.BatchPayload> {
    return await this.commentRepository.update(userId, commentId, context);
  }

  async delete(userId: number, commentId: number): Promise<Prisma.BatchPayload> {
    return await this.commentRepository.delete(userId, commentId);
  }
}
