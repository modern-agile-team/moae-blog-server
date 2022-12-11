import { Injectable } from '@nestjs/common';
import { LikesRepository } from './repository/likes.repository';
import { RequestLikeDto } from './dto/request-like.dto';
import { GetCountDto } from './dto/get-count.dto';

@Injectable()
export class LikeService {
  constructor(private readonly likesRepository: LikesRepository) {}

  async getCount(data: GetCountDto): Promise<any> {
    return await this.likesRepository.getCountByBoardId(data);
  }

  async getOneLike(data: RequestLikeDto): Promise<any> {
    return await this.likesRepository.getOneLike(data);
  }

  async createLike(data: RequestLikeDto): Promise<any> {
    return await this.likesRepository.createLike(data);
  }

  async deletedLike(data: RequestLikeDto): Promise<any> {
    return await this.likesRepository.deleteLike(data);
  }
}
