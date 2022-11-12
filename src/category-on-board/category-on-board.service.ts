import { Injectable } from '@nestjs/common';
import { CategoryOnBoardRepository } from './repository/category-on-board.repository';

@Injectable()
export class CategoryOnBoardService {
  constructor(
    private readonly categoryOnBoardRepository: CategoryOnBoardRepository,
  ) {}
}
