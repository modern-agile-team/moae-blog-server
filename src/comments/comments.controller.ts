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
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { comment, Prisma } from '@prisma/client';
import { User } from 'src/common/decorators/user.decorator';
import { CommentsService } from './comments.service';
import { CreateOrUpdateCommentDto } from './dto/create-or-update-comment.dto';

@ApiTags('Comment API')
@ApiBearerAuth('accessToken')
@UseGuards(AuthGuard('jwt'))
@Controller('board/:boardId/comment')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '한개 게시글의 모든 댓글 조회',
    description: '게시글 고유 번호에 해당하는 모든 댓글을 조회합니다.',
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  async selectAllComments(
    @Param('boardId', ParseIntPipe) boardId: number,
  ): Promise<comment[]> {
    return await this.commentsService.selectAllComments(boardId);
  }

  @ApiOperation({
    summary: '한개 게시글에 댓글 생성',
    description: '댓글을 생성하는 API 입니다.',
  })
  @ApiBody({
    type: CreateOrUpdateCommentDto,
    description: '댓글 내용을 입력해 주세요. 길이 최소 1 ~ 최대 500',
    required: true,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createComment(
    @User() userId: number,
    @Param('boardId', ParseIntPipe) boardId: number,
    @Body() { context }: CreateOrUpdateCommentDto,
  ): Promise<comment> {
    return await this.commentsService.createComment(userId, boardId, context);
  }

  @ApiOperation({
    summary: '댓글 수정',
    description: '댓글을 수정하는 API 입니다.',
  })
  @ApiBody({
    type: CreateOrUpdateCommentDto,
    description: '수정할 댓글 내용을 입력해 주세요. 길이 최소 1 ~ 최대 500',
    required: true,
  })
  @HttpCode(HttpStatus.OK)
  @Put(':commentId')
  async updateComment(
    @User() userId: number,
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() { context }: CreateOrUpdateCommentDto,
  ): Promise<Prisma.BatchPayload> {
    return await this.commentsService.updateComment(userId, commentId, context);
  }

  @ApiOperation({
    summary: '한 개의 댓글 삭제',
    description: '한개 댓글을 삭제합니다.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':commentId')
  async deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
  ): Promise<void> {
    await this.commentsService.deleteComment(commentId);
  }
}
