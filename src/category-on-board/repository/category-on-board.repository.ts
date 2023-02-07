import { Injectable } from '@nestjs/common';
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

  getAll() {
    return this.repository.categories_on_boards.groupBy({
      by: ['categoryId'],
      _count: {
        boardId: true,
      },
      orderBy: {
        _count: {
          boardId: 'desc',
        },
      },
    });
  }

  getCategories() {
    return this.repository.categories_on_boards.findMany({
      select: {
        category: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });
  }
}
