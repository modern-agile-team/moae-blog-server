import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryRepository {
  constructor(private readonly repository: CategoryEntity) {}

  getCategories() {
    return this.repository.category.findMany({
      include: {
        _count: { select: { boards: true } },
      },
      orderBy: {
        boards: { _count: 'desc' },
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

  getCategoriesByNames(categories: string[]) {
    return this.repository.category.findMany({ where: { name: { in: categories } } });
  }
}
