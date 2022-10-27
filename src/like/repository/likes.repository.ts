import { Injectable } from '@nestjs/common';
import { like_rel, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LikesRepository extends PrismaService {
  /**
   * 게시물에 대한 좋아요 검색
   * @param where
   */
  async selectAllLikeByBoardId({
    where,
  }: {
    where?: Prisma.like_relWhereInput;
  }) {
    return this.like_rel.findMany({
      where,
    });
  }

  /**
   * 특정 사용자가 좋아요를 눌렀는지 확인
   * @param likeId
   */
  async selectOneLike(likeId: Prisma.like_relWhereUniqueInput) {
    return this.like_rel.findUnique({
      where: likeId,
    });
  }

  /**
   * 새로운 좋아요 생성 create문
   * @param data { userId, boardId, count }
   */
  async createLike(data: Prisma.like_relCreateInput): Promise<like_rel> {
    return this.like_rel.create({
      data,
    });
  }

  /**
   * 한개의 좋아요 delete문
   * @param where
   */
  async deleteLike(where: Prisma.like_relWhereUniqueInput): Promise<like_rel> {
    return this.like_rel.delete({
      where,
    });
  }
}
