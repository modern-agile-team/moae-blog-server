import { Injectable } from '@nestjs/common';
import { Prisma, user } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersRepository extends PrismaService {
  /**
   * 유저 전체를 조회하는 select문
   * @param skip
   * @param take
   * @param cursor
   * @param where
   * @param orderBy
   * @returns All User Info
   */
  async selectAllUser({
    skip = 1,
    take = 1,
    cursor,
    where,
    orderBy,
  }: {
    skip?: number;
    take?: number;
    cursor?: Prisma.userWhereUniqueInput;
    where?: Prisma.userWhereInput;
    orderBy?: Prisma.userOrderByWithRelationInput;
  }) {
    return this.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  /**
   * 한명의 유저 select문
   * @param userId
   */
  async selectOneUser(userId: Prisma.userWhereUniqueInput) {
    return this.user.findUnique({
      where: userId,
    });
  }

  /**
   * 새로운 유저 생성 create문
   * @param data { name, email }
   */
  async createUser(data: Prisma.userCreateInput): Promise<user> {
    return this.user.create({
      data,
    });
  }

  /**
   * 한명의 유저 정보 update문
   * @param params { where, data }
   */
  async updateUser(params: {
    where: Prisma.userWhereUniqueInput;
    data: Prisma.userUpdateInput;
  }): Promise<user> {
    const { where, data } = params;
    return this.user.update({
      data,
      where,
    });
  }

  /**
   * 한명의 유저 delete문
   * @param where
   */
  async deleteUser(where: Prisma.userWhereUniqueInput): Promise<user> {
    return this.user.delete({
      where,
    });
  }
}
