import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<object> {
    // Test User ID, AuthGuard 부착 후 제거할 예정
    const userId = 4;
    await this.boardsService.createBoard(userId, createBoardDto);

    return { success: true, message: '게시글 저장 성공' };
  }
}
