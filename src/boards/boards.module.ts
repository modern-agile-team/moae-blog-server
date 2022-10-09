import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './repository/boards.repository';
import { TokenStrategy } from '../common/strategy/token.strategy';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository, TokenStrategy],
})
export class BoardsModule {}
