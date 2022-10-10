import { UpdateBoardDto } from '../dto/update-board.dto';

export interface UpdateInterface {
  boardId: number;
  userId: number;
  updateBoardDto: UpdateBoardDto;
}
