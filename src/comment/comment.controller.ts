import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { comment, Prisma } from '@prisma/client';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';
import {
  DeleteCommentSwagger,
  GetAllCommentsOnBoardSwagger,
  PostCommentSwagger,
  PutCommentSwagger,
} from 'src/common/decorators/compose-swagger.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { CommentService } from './comment.service';
import { CreateOrUpdateCommentDto } from './dto/create-or-update-comment.dto';

@ApiTags('Comment API')
@ApiBearerAuth('accessToken')
@Controller('board/:boardId/comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @GetAllCommentsOnBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll(@Param('boardId', ParseIntPipe) boardId: number): Promise<comment[]> {
    return await this.commentService.getAll(boardId);
  }

  @PostCommentSwagger()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @User() { id }: CurrentUserDto,
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() { context }: CreateOrUpdateCommentDto,
  ): Promise<comment> {
    return await this.commentService.create(id, boardId, context);
  }

  @PutCommentSwagger()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Put(':commentId')
  async update(
    @User() { id }: CurrentUserDto,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() { context }: CreateOrUpdateCommentDto,
  ): Promise<Prisma.BatchPayload> {
    return await this.commentService.update(id, commentId, context);
  }

  @DeleteCommentSwagger()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Delete(':commentId')
  async delete(
    @User() { id }: CurrentUserDto,
    @Param('commentId', ParseIntPipe)
    commentId: number,
  ): Promise<Prisma.BatchPayload> {
    return await this.commentService.delete(id, commentId);
  }
}
