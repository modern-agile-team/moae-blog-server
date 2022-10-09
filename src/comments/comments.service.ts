import { BadGatewayException, Injectable } from '@nestjs/common';
import { comment } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SelectCommentDto } from './dto/select-comment.dto';
import { CommentsRepository } from './repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async selectAllComments(
    boardId: number,
    { skip = 0, ...selectOptions }: SelectCommentDto,
  ): Promise<comment[]> {
    const PER_PAGE = 10;

    return await this.commentsRepository.selectAllComment(boardId, {
      skip: PER_PAGE * (Number(skip) > 0 ? Number(skip) - 1 : 0),
      orderBy: { id: 'asc' },
      ...selectOptions,
    });
  }

  async createComment(
    boardId: number,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const comment: comment = await this.commentsRepository.createComment(
      boardId,
      createCommentDto,
    );

    if (!Object.keys(comment).length) {
      throw new BadGatewayException('댓글 작성 실패');
    }
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
