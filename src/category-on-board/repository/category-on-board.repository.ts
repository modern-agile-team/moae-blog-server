import { Injectable } from '@nestjs/common';
import { category, Prisma } from '@prisma/client';
import { CategoryOnBoardEntity } from '../category-on-board.entity';

@Injectable()
export class CategoryOnBoardRepository {
  constructor(private readonly repository: CategoryOnBoardEntity) {}
}
