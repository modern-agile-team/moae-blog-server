import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { board, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { SelectBoardDto } from '../dto/select-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';

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
  async selectAllBoards({
    skip = 1,
    take = 10,
    cursor,
    where,
    orderBy,
  }: SelectBoardDto): Promise<board[]> {
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
   * @CurrentUser userId - 작성자
   * @Body createBoardDto { title, userId, context }
   */
  async createBoard(
    userId: number,
    { title, context }: CreateBoardDto,
  ): Promise<board> {
    try {
      return await this.board.create({
        data: {
          title,
          context,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    } catch (err) {
      throw new InternalServerErrorException(`알 수 없는 서버 에러입니다.`);
    }
  }

  /**
   * 한개의 게시글 정보 update문
   * @param boardId 게시글의 고유번호
   * @param updateBoardDto 게시글의 바뀐 정보
   */
  async updateBoard(
    boardId: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<board> {
    return this.board.update({
      data: updateBoardDto,
      where: { id: boardId },
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
