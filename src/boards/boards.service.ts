import { BadGatewayException, Injectable } from '@nestjs/common';
import { board } from '@prisma/client';
import { CreateBoardDto } from './dto/create-board.dto';
import { SelectBoardDto } from './dto/select-board.dto';
import { BoardsRepository } from './repository/boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async selectAllBoards({
    skip = 0,
    ...selectOptions
  }: SelectBoardDto): Promise<board[]> {
    const PER_PAGE = 10;

    return await this.boardsRepository.selectAllBoards({
      skip: PER_PAGE * (Number(skip) > 0 ? Number(skip) - 1 : 0),
      orderBy: { id: 'desc' },
      ...selectOptions,
    });
  }

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
