import { BadGatewayException, Injectable } from '@nestjs/common';
import { board, Prisma } from '@prisma/client';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsRepository } from './repository/boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async createBoard(
    userId: number,
    createBoardDto: CreateBoardDto,
  ): Promise<void> {
    const board: board = await this.boardsRepository.createBoard(
      userId,
      createBoardDto,
    );

    if (!Object.keys(board).length) {
      throw new BadGatewayException('DB 저장 실패');
    }
  }
}
