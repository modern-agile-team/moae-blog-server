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
} from '@nestjs/common';
import { comment } from '@prisma/client';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('board/:boardId/comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpCode(HttpStatus.OK)
  @Get('all')
  async selectAllComments(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<comment[]> {
    return await this.commentsService.selectAllComments(boardId);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createComment(
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    await this.commentsService.createComment(boardId, createCommentDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':commentId')
  async updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() { context }: UpdateCommentDto,
  ): Promise<void> {
    await this.commentsService.updateComment(commentId, context);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':commentId')
  async deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<void> {
    await this.commentsService.deleteComment(commentId);
  }
}
