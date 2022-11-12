import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryRepository } from './repository/category.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CategoryEntity],
})
export class CategoryModule {}
