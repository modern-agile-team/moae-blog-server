import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(categories: string[]) {
    /*
    이 부분은.. 로직을 따로 설명드릴게요.
    대충 설명하자면 카테고리를 받아서 기존에 있는 카테고리들은 새로 만들지 않고 
    없으면 새로 만든 후에 있는거랑 새로 만든거랑 합쳐서 반환합니다.
    */
    const mappedOriginCategory = categories.map((category: string) =>
      this.categoryRepository.find(category),
    );
    const originCategories = (await Promise.all(mappedOriginCategory)).filter(
      (category) => category,
    );
    const filteredCategories = categories.filter(
      (category) =>
        originCategories.filter(
          (orginCategory) => orginCategory.name === category,
        ).length === 0,
    );
    const mappedRequest = filteredCategories.map((category: string) =>
      this.categoryRepository.create(category),
    );
    const newCategories = await Promise.all(mappedRequest);
    return [...originCategories, ...newCategories];
  }

  async getAll(): Promise<
    {
      id: number;
      name: string;
      createdAt: Date;
      count: number;
    }[]
  > {
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
    const { boards } = await this.categoryRepository.getBoardsInCategory(
      categoryId,
    );
    return boards.map(({ board }) => ({ ...board }));
  }
}
