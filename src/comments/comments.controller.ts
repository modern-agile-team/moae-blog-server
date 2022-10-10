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
import { comment, Prisma } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@UseGuards(AuthGuard('jwt'))
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
    @User() userId: number,
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() { context }: CreateCommentDto,
  ): Promise<comment> {
    return await this.commentsService.createComment(userId, boardId, context);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':commentId')
  async updateComment(
    @User() userId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() { context }: UpdateCommentDto,
  ): Promise<Prisma.BatchPayload> {
    return await this.commentsService.updateComment(userId, commentId, context);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':commentId')
  async deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<void> {
    await this.commentsService.deleteComment(commentId);
  }
}
