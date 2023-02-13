import { Injectable } from '@nestjs/common';
import { board, PrismaClient } from '@prisma/client';
import { CreateBoardDto } from './dto/create-board.dto';
import { SelectBoardDto } from './dto/select-board.dto';
import { BoardRepository } from './repository/board.repository';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardUserType } from '../common/interfaces/index.interface';
import { CategoryRepository } from '../category/repository/category.repository';
import { CategoryOnBoardService } from '../category-on-board/category-on-board.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class BoardService {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryOnBoardService: CategoryOnBoardService,
    private readonly boardsRepository: BoardRepository,
    private readonly categoriesRepository: CategoryRepository,
    private readonly prisma: PrismaClient,
  ) {}

  async getAll(selectBoardDto: SelectBoardDto): Promise<board[]> {
    selectBoardDto.orderBy = selectBoardDto.orderBy ?? 'desc';
    return await this.boardsRepository.getAll(selectBoardDto);
  }

  async getOne(boardId: number): Promise<board> {
    return await this.boardsRepository.getOne(boardId);
  }

  async create(userId: number, createBoardDto: CreateBoardDto): Promise<board> {
    const [boards] = await this.prisma.$transaction([
      this.boardsRepository.create(userId, createBoardDto),
      this.categoriesRepository.multiCreate(createBoardDto.categories),
    ]);
    const categories = await this.categoryService.getCategoriesByNames(
      createBoardDto.categories,
    );
    const categoryIds = categories.map((category) => category.id);
    await this.categoryOnBoardService.multiCreate(categoryIds, boards.id);
    return boards;
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
