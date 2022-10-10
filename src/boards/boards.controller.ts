import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { board } from '@prisma/client';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { SelectBoardDto } from './dto/select-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';

@Controller('board')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('/all')
  async getAll(@Query() selectBoardDto: SelectBoardDto): Promise<board[]> {
    return await this.boardsService.getAll(selectBoardDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @User() userId: number,
  ): Promise<board> {
    return await this.boardsService.create(userId, createBoardDto);
  }

  @HttpCode(HttpStatus.OK)
  @Patch('/:boardId')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @User() userId: number,
  ): Promise<number> {
    return await this.boardsService.update({
      boardId,
      userId,
      updateBoardDto,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:boardId')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('boardId', ParseIntPipe) boardId: number,
    @User() userId: number,
  ): Promise<number> {
    return await this.boardsService.delete({ boardId, userId });
  }
}
