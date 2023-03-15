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
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ROLES_KEY } from 'src/common/constant';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';

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
  async getOneById(@Param('boardId', ParseIntPipe) boardId: number): Promise<board> {
    return await this.boardsService.getOneById(boardId);
  }

  @ApiBearerAuth('accessToken')
  @PostBoardSwagger()
  @HttpCode(HttpStatus.CREATED)
  @Roles(ROLES_KEY.MEMBER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto,
    @User() { id }: CurrentUserDto,
  ): Promise<board> {
    return await this.boardsService.create(id, createBoardDto);
  }

  @ApiBearerAuth('accessToken')
  @PatchBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Roles(ROLES_KEY.MEMBER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':boardId')
  async update(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
    @User() { id }: CurrentUserDto,
  ): Promise<number> {
    return await this.boardsService.update({ boardId, userId: id }, updateBoardDto);
  }

  @ApiBearerAuth('accessToken')
  @DeleteBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Roles(ROLES_KEY.MEMBER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':boardId')
  async delete(
    @Param('boardId', ParseIntPipe) boardId: number,
    @User() { id }: CurrentUserDto,
  ): Promise<number> {
    return await this.boardsService.delete({ boardId, userId: id });
  }
}
