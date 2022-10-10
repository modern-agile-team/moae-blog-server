import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './repository/boards.repository';
import { TokenStrategy } from '../common/strategy/token.strategy';
import { BoardsEntity } from './boards.entity';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository, TokenStrategy, BoardsEntity],
})
export class BoardsModule {}
