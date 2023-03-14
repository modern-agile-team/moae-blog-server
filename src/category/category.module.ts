import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, CategoryEntity],
  exports: [CategoryService],
})
export class CategoryModule {}
