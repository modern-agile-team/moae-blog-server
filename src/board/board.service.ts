import { Injectable } from '@nestjs/common';
import { board } from '@prisma/client';
import { CreateBoardDto } from './dto/create-board.dto';
import { SelectBoardDto } from './dto/select-board.dto';
import { BoardRepository } from './repository/board.repository';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardUserType } from '../common/interfaces/index.interface';

@Injectable()
export class BoardService {
  constructor(private readonly boardsRepository: BoardRepository) {}

  async getAll(selectBoardDto: SelectBoardDto): Promise<board[]> {
    !selectBoardDto.orderBy
      ? (selectBoardDto.orderBy = 'desc')
      : selectBoardDto.orderBy;
    return await this.boardsRepository.getAll(selectBoardDto);
  }

  async create(userId: number, createBoardDto: CreateBoardDto): Promise<board> {
    return await this.boardsRepository.create(userId, createBoardDto);
  }

  async update(
    essentialData: BoardUserType,
    updateBoardDto: UpdateBoardDto,
  ): Promise<number> {
    const result = await this.boardsRepository.update(
      essentialData,
      updateBoardDto,
    );
    return result.count;
  }

  async delete(essentialData: BoardUserType): Promise<number> {
    const result = await this.boardsRepository.delete(essentialData);
    return result.count;
  }
}
