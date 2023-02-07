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

  async getAll(): Promise<
    {
      categoryName: string;
      boardCount: number;
      categoryId: number;
    }[]
  > {
    // 카테고리별 게시글 개수를 가져옴
    const boardsOnCategory = await this.categoryOnBoardRepository.getAll();
    const categories = boardsOnCategory.map(({ _count, categoryId }) => ({
      boardCount: _count.boardId,
      categoryId,
    }));

    // 카테고리 전체 항목을 가지고 와서 중복제거
    const categoryNames = await this.categoryOnBoardRepository.getCategories();
    const filteredDuplicateCategory: {
      name: string;
      id: number;
    }[] = categoryNames.reduce((acc, { category }) => {
      if (acc.findIndex(({ id }) => id === category.id) === -1) {
        acc.push(category);
      }
      return acc;
    }, []);

    // 카테고리 이름 매핑
    const mappedCategories = categories.map((category) => ({
      ...category,
      categoryName: filteredDuplicateCategory.find(
        ({ id }) => id === category.categoryId,
      ).name,
    }));

    return mappedCategories;
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
    const boards = await this.categoryOnBoardRepository.getBoardsInCategory(
      categoryId,
    );
    return boards.map(({ board }) => ({ ...board }));
  }
}
