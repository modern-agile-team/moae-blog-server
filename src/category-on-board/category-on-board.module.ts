import { Module } from '@nestjs/common';
import { CategoryOnBoardController } from './category-on-board.controller';
import { CategoryOnBoardEntity } from './category-on-board.entity';
import { CategoryOnBoardService } from './category-on-board.service';
import { CategoryOnBoardRepository } from './repository/category-on-board.repository';

@Module({
  controllers: [CategoryOnBoardController],
  providers: [
    CategoryOnBoardService,
    CategoryOnBoardRepository,
    CategoryOnBoardEntity,
  ],
})
export class CategoryOnBoardModule {}
