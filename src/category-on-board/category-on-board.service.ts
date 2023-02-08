import { Injectable } from '@nestjs/common';
import { category } from '@prisma/client';
import { CategoryOnBoardRepository } from './repository/category-on-board.repository';

@Injectable()
export class CategoryOnBoardService {
  constructor(
    private readonly categoryOnBoardRepository: CategoryOnBoardRepository,
  ) {}

  async create(categories: category[], boardId: number) {
    const mappedRequest = categories.map((category) =>
      this.categoryOnBoardRepository.create(category.id, boardId),
    );
    return await Promise.all(mappedRequest);
  }
}
