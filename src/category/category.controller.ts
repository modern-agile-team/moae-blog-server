import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  GetAllCategoriesSwagger,
  GetBoardsInCategorySwagger,
} from 'src/common/decorators';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @GetAllCategoriesSwagger()
  @HttpCode(HttpStatus.OK)
  @Get('all')
  async getAll(): Promise<
    {
      id: number;
      name: string;
      createdAt: Date;
      count: number;
    }[]
  > {
    return await this.categoryService.getAll();
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
    return await this.categoryService.getBoardsInCategory(categoryId);
  }
}
