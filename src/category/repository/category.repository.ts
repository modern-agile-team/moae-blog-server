import { Injectable } from '@nestjs/common';
import { category, Prisma } from '@prisma/client';
import { CategoryEntity } from '../category.entity';

@Injectable()
export class CategoryRepository {
  constructor(private readonly repository: CategoryEntity) {}
}
