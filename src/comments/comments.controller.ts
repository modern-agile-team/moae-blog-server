import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    await this.commentsService.createComment(createCommentDto);
  }
}
