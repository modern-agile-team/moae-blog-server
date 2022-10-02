import { BadGatewayException, Injectable } from '@nestjs/common';
import { comment } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SelectCommentDto } from './dto/select-comment.dto';
import { CommentsRepository } from './repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async selectAllComments({
    skip = 0,
    ...selectOptions
  }: SelectCommentDto): Promise<comment[]> {
    const PER_PAGE = 10;

    return await this.commentsRepository.selectAllComment({
      skip: PER_PAGE * (Number(skip) > 0 ? Number(skip) - 1 : 0),
      orderBy: { id: 'asc' },
      ...selectOptions,
    });
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<void> {
    const comment: comment = await this.commentsRepository.createComment(
      createCommentDto,
    );

    if (!comment) {
      throw new BadGatewayException('댓글 작성 실패');
    }
  }
}
