import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryOnBoardService } from './category-on-board.service';

@ApiTags('Category API')
@Controller('category')
export class CategoryOnBoardController {
  constructor(private readonly categoryOnBoardService: CategoryOnBoardService) {}
}
