import { Controller } from '@nestjs/common';
import { CategoryOnBoardService } from './category-on-board.service';

@Controller('category')
export class CategoryOnBoardController {
  constructor(
    private readonly categoryOnBoardService: CategoryOnBoardService,
  ) {}
}
