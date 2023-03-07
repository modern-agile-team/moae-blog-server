import {
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
import { CreateBoardDto } from './dto/create-board.dto';
import { SelectBoardDto } from './dto/select-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { BoardService } from './board.service';
import {
  User,
  DeleteBoardSwagger,
  GetAllBoardSwagger,
  GetOneBoardSwagger,
  PatchBoardSwagger,
  PostBoardSwagger,
  SearchBoardSwagger,
} from '../common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SearchBoardDto } from './dto/search-board.dto';

@ApiBearerAuth('accessToken')
@ApiTags('board API')
@Controller('boards')
export class BoardController {
  constructor(private readonly boardsService: BoardService) {}

  @SearchBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Get('search')
  async search(@Query() query: SearchBoardDto) {
    return await this.boardsService.search(query);
  }

  @GetAllBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(@Query() selectBoardDto: SelectBoardDto): Promise<board[]> {
    return await this.boardsService.getAll(selectBoardDto);
  }

  @GetOneBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Get(':boardId')
  async getOneById(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<board> {
    return await this.boardsService.getOneById(boardId);
  }

  @PostBoardSwagger()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @User() userId: number,
  ): Promise<board> {
    return await this.boardsService.create(userId, createBoardDto);
  }

  @PatchBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Patch(':boardId')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @User() userId: number,
  ): Promise<number> {
    return await this.boardsService.update(
      {
        boardId,
        userId,
      },
      updateBoardDto,
    );
  }

  @DeleteBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Delete(':boardId')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('boardId', ParseIntPipe) boardId: number,
    @User() userId: number,
  ): Promise<number> {
    return await this.boardsService.delete({ boardId, userId });
  }
}
