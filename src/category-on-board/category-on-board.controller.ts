import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetAllCategoriesSwagger } from 'src/common/decorators';
import { CategoryOnBoardService } from './category-on-board.service';

@ApiTags('Category API')
@Controller('category')
export class CategoryOnBoardController {
  constructor(
    private readonly categoryOnBoardService: CategoryOnBoardService,
  ) {}

  @GetAllCategoriesSwagger()
  @HttpCode(HttpStatus.OK)
  @Get('all')
  async getAll(): Promise<
    {
      categoryName: string;
      boardCount: number;
      categoryId: number;
    }[]
  > {
    return await this.categoryOnBoardService.getAll();
  }
}
