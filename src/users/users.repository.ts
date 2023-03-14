import { Injectable } from '@nestjs/common';
import { Prisma, user } from '@prisma/client';
import { ROLES_KEY } from 'src/common/constant';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersRepository extends PrismaService {
  /**
   * 한명의 유저 select문
   * @param userId
   */
  getUser(userId: number) {
    return this.user.findUnique({
      select: {
        id: true,
        name: true,
        email: true,
        baseUrl: true,
        createdAt: true,
        updatedAt: true,
        boards: true,
      },
      where: { id: userId },
    });
  }

  /**
   * 새로운 유저 생성 create문
   * @param data { name, email }
   */
  async createUser({ email, name, baseUrl }: Prisma.userCreateInput): Promise<user> {
    return this.user.create({ data: { email, name, baseUrl, authCode: ROLES_KEY.USER } });
  }

  /**
   * 이메일을 통해 유저 정보 찾기
   * @param email
   */
  async selectOneUserByEmail(email: string): Promise<user> {
    return await this.user.findFirst({ where: { email } });
  }
}
