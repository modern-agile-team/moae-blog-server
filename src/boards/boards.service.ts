import { BadGatewayException, Injectable } from '@nestjs/common';
import { board } from '@prisma/client';
import { CreateBoardDto } from './dto/create-board.dto';
import { SelectBoardDto } from './dto/select-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
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
  ): Promise<board> {
    return await this.boardsRepository.createBoard(userId, createBoardDto);
  }

  async updateBoard(
    boardId: number,
    updateBoardDto: UpdateBoardDto,
  ): Promise<void> {
    const updateResult: board = await this.boardsRepository.updateBoard(
      boardId,
      updateBoardDto,
    );

    if (!Object.keys(updateResult).length) {
      throw new BadGatewayException('DB 수정 실패');
    }
  }

  async deleteBoard(boardId: number): Promise<void> {
    const deleteResult: board = await this.boardsRepository.deleteBoard(
      boardId,
    );

    if (!Object.keys(deleteResult).length) {
      throw new BadGatewayException('DB 삭제 실패');
    }
  }
}
