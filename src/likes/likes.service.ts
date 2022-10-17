import { Injectable } from '@nestjs/common';
import { LikesRepository } from './repository/likes.repository';

@Injectable()
export class LikesService {
  constructor(private readonly likesRepository: LikesRepository) {}
}
