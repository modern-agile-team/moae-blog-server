import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repository/category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(categories: string[]) {
    const mappedRequest = categories.map((category: string) =>
      this.categoryRepository.create(category),
    );
    return await Promise.all(mappedRequest);
  }
}
