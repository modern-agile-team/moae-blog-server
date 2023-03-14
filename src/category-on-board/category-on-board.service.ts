import { Injectable } from '@nestjs/common';
import { CategoryOnBoardRepository } from './category-on-board.repository';

@Injectable()
export class CategoryOnBoardService {
  constructor(private readonly categoryOnBoardRepository: CategoryOnBoardRepository) {}

  async create(categoryId: number, boardId: number) {
    return this.categoryOnBoardRepository.create(categoryId, boardId);
  }

  async multiCreate(categoryIds: number[], boardId: number) {
    return this.categoryOnBoardRepository.multiCreate(categoryIds, boardId);
  }
}
