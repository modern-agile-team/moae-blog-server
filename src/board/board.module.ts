import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { BoardRepository } from './repository/board.repository';
import { TokenStrategy } from '../common/strategy/token.strategy';
import { BoardEntity } from './board.entity';

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, TokenStrategy, BoardEntity],
})
export class BoardModule {}
