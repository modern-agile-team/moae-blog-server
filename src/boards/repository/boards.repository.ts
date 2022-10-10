import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { board, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBoardDto } from '../dto/create-board.dto';
import { SelectBoardDto } from '../dto/select-board.dto';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { BoardsEntity } from '../boards.entity';
import { UpdateInterface } from '../interfaces/update.interface';
import { DeleteInterface } from '../interfaces/delete.interface';

@Injectable()
export class BoardsRepository {
  constructor(private readonly repository: BoardsEntity) {}
  /**
   * 게시글 전체를 조회하는 select문
   * @param {skip, take, orderBy}
   * skip: 표시할 첫번째 페이지
   * take: 표시할 마지막 페이지
   * orderBy => 정렬
   */
  async getAll({ skip, take, orderBy }: SelectBoardDto): Promise<board[]> {
    return this.repository.board.findMany({
      skip,
      take,
      orderBy: {
        id: orderBy,
      },
    });
  }

  /**
   * 한개의 게시글 select문
   * @param boardId
   */
  async selectOneBoard(boardId: Prisma.boardWhereUniqueInput) {
    return this.repository.board.findUnique({
      where: boardId,
    });
  }

  /**
   * 새로운 게시글 생성 create문
   * @CurrentUser userId - 작성자
   * @Body createBoardDto { title, userId, context }
   */
  async create(
    userId: number,
    { title, context }: CreateBoardDto,
  ): Promise<board> {
    return await this.repository.board.create({
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
  }

  /**
   * 한개의 게시글 정보 update문
   * @param boardId 게시글의 고유번호
   * @param updateBoardDto 게시글의 바뀐 정보
   */
  async update(essentialData: UpdateInterface): Promise<Prisma.BatchPayload> {
    return this.repository.board.updateMany({
      data: essentialData.updateBoardDto,
      where: {
        id: essentialData.boardId,
        userId: essentialData.userId,
      },
    });
  }

  /**
   * 한개의 게시글 delete문
   * @param boardId 삭제할 게시글 고유번호
   */
  async delete(essentialData: DeleteInterface): Promise<Prisma.BatchPayload> {
    return this.repository.board.deleteMany({
      where: {
        id: essentialData.boardId,
        userId: essentialData.userId,
      },
    });
  }
}
