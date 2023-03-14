import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';

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
    return this.repository.category.upsert({
      where: {
        name: category,
      },
      update: {},
      create: {
        name: category,
      },
    });
  }

  multiCreate(categories: string[]) {
    const data = categories.map((category) => {
      return {
        name: category,
      };
    });
    return this.repository.category.createMany({
      data: data,
      skipDuplicates: true,
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

  getCategoriesByNames(categories: string[]) {
    return this.repository.category.findMany({
      where: {
        name: {
          in: categories,
        },
      },
    });
  }
}
