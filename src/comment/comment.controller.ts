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
@UseGuards(AuthGuard('jwt'))
@Controller('board/:boardId/comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @GetAllCommentsOnBoardSwagger()
  @HttpCode(HttpStatus.OK)
  @Get('all')
  async getAll(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<comment[]> {
    return await this.commentService.getAll(boardId);
  }

  @PostCommentSwagger()
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(
    @User() userId: number,
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() { context }: CreateOrUpdateCommentDto,
  ): Promise<comment> {
    return await this.commentService.create(userId, boardId, context);
  }

  @PutCommentSwagger()
  @HttpCode(HttpStatus.OK)
  @Put(':commentId')
  async update(
    @User() userId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() { context }: CreateOrUpdateCommentDto,
  ): Promise<Prisma.BatchPayload> {
    return await this.commentService.update(userId, commentId, context);
  }

  @DeleteCommentSwagger()
  @HttpCode(HttpStatus.OK)
  @Delete(':commentId')
  async delete(
    @User() userId: number,
    @Param('commentId', ParseIntPipe)
    commentId: number,
  ): Promise<Prisma.BatchPayload> {
    return await this.commentService.delete(userId, commentId);
  }
}
