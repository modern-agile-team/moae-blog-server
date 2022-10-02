import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { comment } from '@prisma/client';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { SelectCommentDto } from './dto/select-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async selectAllComments(
    @Query() selectCommentDto: SelectCommentDto,
  ): Promise<comment[]> {
    return await this.commentsService.selectAllComments(selectCommentDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    await this.commentsService.createComment(createCommentDto);
  }
}
