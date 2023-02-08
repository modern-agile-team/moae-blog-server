import { Injectable } from '@nestjs/common';
import { CategoryEntity } from '../category.entity';

@Injectable()
export class CategoryRepository {
  constructor(private readonly repository: CategoryEntity) {}

  find(categoryName: string) {
    return this.repository.category.findFirst({
      where: {
        name: categoryName,
      },
    });
  }

  create(category: string) {
    return this.repository.category.create({
      data: {
        name: category,
      },
    });
  }

  getCategories() {
    return this.repository.category.findMany({
      include: {
        _count: {
          select: {
            boards: true,
          },
        },
      },
      orderBy: {
        boards: {
          _count: 'desc',
        },
      },
    });
  }

  getBoardsInCategory(categoryId: number) {
    return this.repository.category.findFirst({
      select: {
        boards: {
          select: {
            board: true,
          },
          orderBy: {
            board: {
              createdAt: 'desc',
            },
          },
        },
      },
      where: {
        id: categoryId,
      },
    });
  }
}
