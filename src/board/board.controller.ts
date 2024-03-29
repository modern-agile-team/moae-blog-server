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
import { board, category } from '@prisma/client';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { SelectBoardDto } from './dto/select-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';
import { ApiTags } from '@nestjs/swagger';
import {
  DeleteBoardSwagger,
  GetAllBoardSwagger,
  PatchBoardSwagger,
  PostBoardSwagger,
} from '../common/decorators/compose-swagger.decorator';
import { CategoryService } from 'src/category/category.service';
import { CategoryOnBoardService } from 'src/category-on-board/category-on-board.service';

@ApiTags('board API')
@Controller('board')
export class BoardController {
  constructor(
    private readonly boardsService: BoardService,
    private readonly categoryService: CategoryService,
    private readonly categoryOnBoardService: CategoryOnBoardService,
  ) {}

  @GetAllBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Get('/all')
  async getAll(@Query() selectBoardDto: SelectBoardDto): Promise<board[]> {
    return await this.boardsService.getAll(selectBoardDto);
  }

  @PostBoardSwagger()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @User() userId: number,
  ): Promise<any> {
    const categories: category[] = await this.categoryService.create(
      createBoardDto.categories,
    );
    const board: board = await this.boardsService.create(
      userId,
      createBoardDto,
    );
    await this.categoryOnBoardService.create(categories, board.id);
    return board;
  }

  @PatchBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Patch('/:boardId')
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
  @Delete('/:boardId')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('boardId', ParseIntPipe) boardId: number,
    @User() userId: number,
  ): Promise<number> {
    return await this.boardsService.delete({ boardId, userId });
  }
}
