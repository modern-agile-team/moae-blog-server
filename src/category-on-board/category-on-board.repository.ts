import { Injectable } from '@nestjs/common';
import { CategoryOnBoardEntity } from './category-on-board.entity';

@Injectable()
export class CategoryOnBoardRepository {
  constructor(private readonly repository: CategoryOnBoardEntity) {}

  create(categoryId: number, boardId: number) {
    return this.repository.categories_on_boards.create({ data: { categoryId, boardId } });
  }

  multiCreate(categoryIds: number[], boardId: number) {
    const data = categoryIds.map(categoryId => ({ categoryId, boardId }));

    return this.repository.categories_on_boards.createMany({ data, skipDuplicates: true });
  }
}
