import { Injectable } from '@nestjs/common';
import { board, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BoardsRepository extends PrismaService {
  /**
   * 게시글 전체를 조회하는 select문
   * @param skip
   * @param take
   * @param cursor
   * @param where
   * @param orderBy
   */
  async selectAllBoard({
    skip = 1,
    take = 1,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.boardWhereUniqueInput;
    where?: Prisma.boardWhereInput;
    orderBy?: Prisma.boardOrderByWithRelationInput;
  }) {
    return this.board.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * 한개의 게시글 select문
   * @param boardId
   */
  async selectOneBoard(boardId: Prisma.boardWhereUniqueInput) {
    return this.board.findUnique({
      where: boardId,
    });
  }

  /**
   * 새로운 게시글 생성 create문
   * @param data { title, userId, context }
   */
  async createBoard(data: Prisma.boardCreateInput): Promise<board> {
    return this.board.create({
      data,
    });
  }

  /**
   * 한개의 게시글 정보 update문
   * @param params { where, data }
   */
  async updateBoard(params: {
    where: Prisma.boardWhereUniqueInput;
    data: Prisma.boardUpdateInput;
  }): Promise<board> {
    const { where, data } = params;
    return this.board.update({
      data,
      where,
    });
  }

  /**
   * 한개의 게시글 delete문
   * @param where
   */
  async deleteBoard(where: Prisma.boardWhereUniqueInput): Promise<board> {
    return this.board.delete({
      where,
    });
  }
}
