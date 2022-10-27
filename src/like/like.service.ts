import { Injectable } from '@nestjs/common';
import { LikesRepository } from './repository/likes.repository';

@Injectable()
export class LikeService {
  constructor(private readonly likesRepository: LikesRepository) {}
}
