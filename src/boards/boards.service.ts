import { Injectable } from '@nestjs/common';
import { BoardsRepository } from './repository/boards.repository';

@Injectable()
export class BoardsService {
  constructor(private readonly boardsRepository: BoardsRepository) {}
}
