import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from './repository/board.repository';
import { TokenStrategy } from '../common/strategy/token.strategy';
import { BoardEntity } from './board.entity';
import { CategoryService } from 'src/category/category.service';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { CategoryEntity } from 'src/category/category.entity';
import { CategoryOnBoardService } from 'src/category-on-board/category-on-board.service';
import { CategoryOnBoardRepository } from 'src/category-on-board/repository/category-on-board.repository';
import { CategoryOnBoardEntity } from 'src/category-on-board/category-on-board.entity';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [BoardController],
  providers: [
    BoardService,
    BoardRepository,
    TokenStrategy,
    BoardEntity,
    CategoryService,
    CategoryRepository,
    CategoryEntity,
    CategoryOnBoardService,
    CategoryOnBoardRepository,
    CategoryOnBoardEntity,
    PrismaClient,
  ],
})
export class BoardModule {}
