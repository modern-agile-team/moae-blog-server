import { Injectable } from '@nestjs/common';
import { board, Prisma } from '@prisma/client';
import { CreateBoardDto } from '../dto/create-board.dto';
import { SelectBoardDto } from '../dto/select-board.dto';
import { BoardEntity } from '../board.entity';
import { BoardUserType } from '../../common/interfaces/index.interface';
import { UpdateBoardDto } from '../dto/update-board.dto';
import { SearchWhere } from '../board.type';
import { SearchBoardDto } from '../dto/search-board.dto';

@Injectable()
export class BoardRepository {
  constructor(private readonly repository: BoardEntity) {}

  search(
    where: SearchWhere,
    { skip, take, orderBy }: Pick<SearchBoardDto, 'skip' | 'take' | 'orderBy'>,
  ) {
    return this.repository.board.findMany({
      select: {
        id: true,
        title: true,
        context: true,
        thumbnail: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            name: true,
            baseUrl: true,
          },
        },
        categories: {
          select: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      where,
      skip,
      take,
      orderBy: {
        id: orderBy,
      },
    });
  }

  /**
   * 게시글 전체를 조회하는 select문
   * @param {skip, take, orderBy}
   * skip: 생략할 페이지 수
   * take: 표시할 페이지 수
   * orderBy => 정렬
   */
  async getAll({ skip, take, orderBy }: SelectBoardDto): Promise<board[]> {
    return this.repository.board.findMany({
      skip,
      take,
      orderBy: {
        id: orderBy,
      },
      include: {
        user: true,
        categories: true,
      },
    });
  }

  /**
   * 한개의 게시글 select문
   * @param boardId
   */
  getOneById(boardId: number): Promise<board> {
    return this.repository.board.findUnique({
      where: { id: boardId },
      include: {
        user: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  /**
   * 새로운 게시글 생성 create문
   * @CurrentUser userId - 작성자
   * @Body createBoardDto { title, userId, context }
   */
  create(userId: number, { title, context, thumbnail }: CreateBoardDto) {
    return this.repository.board.create({
      data: {
        title,
        context,
        thumbnail: thumbnail !== null ? thumbnail : 'thumbnail',
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
   * @param essentialData 삭제하는 유저 인덱스값 & 게시글의 고유번호
   * @param updateBoardDto 게시글의 바뀐 정보
   */
  async update(
    essentialData: BoardUserType,
    updateBoardDto: UpdateBoardDto,
  ): Promise<Prisma.BatchPayload> {
    return this.repository.board.updateMany({
      data: updateBoardDto,
      where: {
        id: essentialData.boardId,
        userId: essentialData.userId,
      },
    });
  }

  /**
   * 한개의 게시글 delete문
   * @param essentialData 삭제하는 유저 인덱스값 & 게시글의 고유번호
   */
  async delete(essentialData: BoardUserType): Promise<Prisma.BatchPayload> {
    return this.repository.board.deleteMany({
      where: {
        id: essentialData.boardId,
        userId: essentialData.userId,
      },
    });
  }
}
