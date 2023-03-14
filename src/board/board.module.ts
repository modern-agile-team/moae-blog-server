import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from './board.repository';
import { TokenStrategy } from '../common/strategy/token.strategy';
import { BoardEntity } from './board.entity';
import { PrismaClient } from '@prisma/client';
import { CategoryModule } from '../category/category.module';
import { CategoryOnBoardModule } from '../category-on-board/category-on-board.module';

@Module({
  imports: [CategoryModule, CategoryOnBoardModule],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, TokenStrategy, BoardEntity, PrismaClient],
  exports: [BoardService],
})
export class BoardModule {}
