import { BadGatewayException, Injectable } from '@nestjs/common';
import { board } from '@prisma/client';
import { CreateBoardDto } from './dto/create-board.dto';
import { SelectBoardDto } from './dto/select-board.dto';
import { BoardsRepository } from './repository/boards.repository';
import { UpdateInterface } from './interfaces/update.interface';
import { DeleteInterface } from './interfaces/delete.interface';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}

  async getAll(selectBoardDto: SelectBoardDto): Promise<board[]> {
    !selectBoardDto.orderBy
      ? (selectBoardDto.orderBy = 'desc')
      : selectBoardDto.orderBy;
    return await this.boardsRepository.getAll(selectBoardDto);
  }

  async create(userId: number, createBoardDto: CreateBoardDto): Promise<board> {
    return await this.boardsRepository.create(userId, createBoardDto);
  }

  async update(essentialData: UpdateInterface): Promise<number> {
    const result = await this.boardsRepository.update(essentialData);
    return result.count;
  }

  async delete(essentialData: DeleteInterface): Promise<number> {
    const result = await this.boardsRepository.delete(essentialData);
    return result.count;
  }
}
