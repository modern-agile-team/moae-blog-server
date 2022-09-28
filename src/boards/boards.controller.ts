import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { board } from '@prisma/client';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { SelectBoardDto } from './dto/select-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async selectAllBoards(
    @Query() selectBoardDto: SelectBoardDto,
  ): Promise<object> {
    const boards: board[] = await this.boardsService.selectAllBoards(
      selectBoardDto,
    );

    return { message: '게시글 전체 조회 완료', data: boards };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<void> {
    // Test User ID, AuthGuard 부착 후 제거할 예정
    const userId = 1;

    await this.boardsService.createBoard(userId, createBoardDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':boardId')
  async updateBoard(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<void> {
    if (Object.keys(updateBoardDto).length < 1) {
      throw new BadRequestException('게시글 정보가 잘못되었습니다.');
    }

    await this.boardsService.updateBoard(boardId, updateBoardDto);
  }
}
