import { Injectable } from '@nestjs/common';
import { comment, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsRepository extends PrismaService {
  /**
   * 댓글 전체를 조회하는 select문
   * @param skip
   * @param take
   * @param cursor
   * @param where
   * @param orderBy
   */
  async selectAllComment({
    skip = 1,
    take = 1,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.commentWhereUniqueInput;
    where?: Prisma.commentWhereInput;
    orderBy?: Prisma.commentOrderByWithRelationInput;
  }) {
    return this.comment.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * 한개의 댓글 select문
   * @param commentId
   */
  async selectOneComment(commentId: Prisma.commentWhereUniqueInput) {
    return this.comment.findUnique({
      where: commentId,
    });
  }

  /**
   * 새로운 댓글 생성 create문
   * @param data { userId, boardId, context }
   */
  async createComment(data: Prisma.commentCreateInput): Promise<comment> {
    return this.comment.create({
      data,
    });
  }

  /**
   * 한개의 댓글 정보 update문
   * @param params { where, data }
   */
  async updateComment(params: {
    where: Prisma.commentWhereUniqueInput;
    data: Prisma.commentUpdateInput;
  }): Promise<comment> {
    const { where, data } = params;
    return this.comment.update({
      data,
      where,
    });
  }

  /**
   * 한개의 댓글 delete문
   * @param where
   */
  async deleteComment(where: Prisma.commentWhereUniqueInput): Promise<comment> {
    return this.comment.delete({
      where,
    });
  }
}
