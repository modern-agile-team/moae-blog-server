import { Injectable } from '@nestjs/common';
import { like_rel } from '@prisma/client';
import { LikeEntity } from '../like.entity';
import { GetCountDto } from '../dto/get-count.dto';
import { RequestLikeDto } from '../dto/request-like.dto';

@Injectable()
export class LikesRepository {
  constructor(private readonly repository: LikeEntity) {}
  /**
   * 게시물에 대한 좋아요 검색
   * @param data {boardId}
   */
  async getCountByBoardId(data: GetCountDto): Promise<number> {
    return this.repository.like_rel.count({
      where: data,
    });
  }

  /**
   * 특정 사용자가 좋아요를 눌렀는지 확인
   * @param data {userId, boardId}
   */
  async getOneLike(data: RequestLikeDto) {
    return this.repository.like_rel.findFirst({
      where: data,
    });
  }

  /**
   * 새로운 좋아요 생성 create문
   * @param data {userId, boardId}
   */
  async createLike(data: RequestLikeDto): Promise<like_rel> {
    return this.repository.like_rel.create({
      data,
    });
  }

  /**
   * 한개의 좋아요 delete문
   * @param data {userId, boardId}
   */
  async deleteLike(data: RequestLikeDto): Promise<like_rel> {
    return this.repository.like_rel.delete({
      where: {
        userId_boardId: data,
      },
    });
  }
}
