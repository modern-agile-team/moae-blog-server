import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardsRepository } from './repository/boards.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BoardsController],
  providers: [BoardsService, BoardsRepository, PrismaService],
})
export class BoardsModule {}
