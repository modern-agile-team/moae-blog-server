import { Injectable } from '@nestjs/common';
import { like_rel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LikesRepository extends PrismaService {
  /**
   * 좋아요 전체를 조회하는 select문
   * @param skip
   * @param take
   * @param cursor
   * @param where
   * @param orderBy
   */
  async selectAllLike({
    skip = 1,
    take = 1,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.like_relWhereUniqueInput;
    where?: Prisma.like_relWhereInput;
    orderBy?: Prisma.like_relOrderByWithRelationInput;
  }) {
    return this.like_rel.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * 한개의 좋아요 select문
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
   * 한개의 좋아요 정보 update문
   * @param params { where, data }
   */
  async updateLike(params: {
    where: Prisma.like_relWhereUniqueInput;
    data: Prisma.like_relUpdateInput;
  }): Promise<like_rel> {
    const { where, data } = params;
    return this.like_rel.update({
      data,
      where,
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
