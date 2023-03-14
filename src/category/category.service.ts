import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async getAll(): Promise<{ id: number; name: string; createdAt: Date; count: number }[]> {
    const categories = await this.categoryRepository.getCategories();
    return categories.map(({ _count, ...category }) => ({
      ...category,
      count: _count.boards,
    }));
  }

  async getBoardsInCategory(categoryId: number): Promise<
    {
      id: number;
      title: string;
      userId: number;
      context: string;
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    const { boards } = await this.categoryRepository.getBoardsInCategory(categoryId);
    return boards.map(({ board }) => board);
  }

  async getCategoriesByNames(categories: string[]) {
    return this.categoryRepository.getCategoriesByNames(categories);
  }
}
