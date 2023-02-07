import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  GetAllCategoriesSwagger,
  GetBoardsInCategorySwagger,
} from 'src/common/decorators';
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

  @GetBoardsInCategorySwagger()
  @HttpCode(HttpStatus.OK)
  @Get(':categoryId')
  async getBoardsInCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ): Promise<
    {
      id: number;
      title: string;
      userId: number;
      context: string;
      createdAt: Date;
      updatedAt: Date;
    }[]
  > {
    return await this.categoryOnBoardService.getBoardsInCategory(categoryId);
  }
}
