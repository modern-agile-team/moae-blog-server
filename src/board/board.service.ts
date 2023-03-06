import { Injectable } from '@nestjs/common';
import { board, PrismaClient } from '@prisma/client';
import { CreateBoardDto } from './dto/create-board.dto';
import { SelectBoardDto } from './dto/select-board.dto';
import { BoardRepository } from './repository/board.repository';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardUserType } from '../common/interfaces/index.interface';
import { CategoryOnBoardService } from '../category-on-board/category-on-board.service';
import { CategoryService } from '../category/category.service';
import { SearchBoardDto } from './dto/search-board.dto';

@Injectable()
export class BoardService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryOnBoardService: CategoryOnBoardService,
    private readonly boardsRepository: BoardRepository,
    private readonly prisma: PrismaClient,
  ) {}

  async search({ target, keyword, ...options }: SearchBoardDto) {
    return await this.boardsRepository.search(
      {
        OR: keyword.map((key) => ({
          [target]: {
            contains: key,
          },
        })),
      },
      options,
    );
  }

  async getAll(selectBoardDto: SelectBoardDto): Promise<board[]> {
    selectBoardDto.orderBy = selectBoardDto.orderBy ?? 'desc';
    return await this.boardsRepository.getAll(selectBoardDto);
  }

  async getOneById(boardId: number): Promise<board> {
    return await this.boardsRepository.getOneById(boardId);
  }

  async create(userId: number, dto: CreateBoardDto): Promise<board> {
    return await this.prisma.$transaction(async (prisma) => {
      const board = await prisma.board.create({
        data: {
          title: dto.title,
          context: dto.context,
          thumbnail: dto.thumbnail ?? 'thumbnail',
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      for (let i = 0; i < dto.categories.length; i++) {
        const name = dto.categories[i];
        const category = await prisma.category.upsert({
          where: {
            name,
          },
          update: {},
          create: {
            name,
          },
        });

        await prisma.categories_on_boards.create({
          data: {
            categoryId: category.id,
            boardId: board.id,
          },
        });
      }

      return board;
    });
  }

  async update(
    essentialData: BoardUserType,
    updateBoardDto: UpdateBoardDto,
  ): Promise<number> {
    const result = await this.boardsRepository.update(
      essentialData,
      updateBoardDto,
    );
    return result.count;
  }

  async delete(essentialData: BoardUserType): Promise<number> {
    const result = await this.boardsRepository.delete(essentialData);
    return result.count;
  }
}
