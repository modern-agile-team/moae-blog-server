import { Injectable } from '@nestjs/common';
import { categories_on_boards, Prisma } from '@prisma/client';
import { CategoryOnBoardEntity } from '../category-on-board.entity';

@Injectable()
export class CategoryOnBoardRepository {
  constructor(private readonly repository: CategoryOnBoardEntity) {}

  create(categoryId: number, boardId: number) {
    return this.repository.categories_on_boards.create({
      data: {
        categoryId,
        boardId,
      },
    });
  }
}
