import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async checkUserExsitence(email: string): Promise<boolean> {
    return !!(await this.usersRepository.selectOneUserByEmail(email));
  }

  async signInUser(user: CurrentUserDto): Promise<user> {
    const selectedUser: user = await this.usersRepository.selectOneUserByEmail(
      user.email,
    );
    return selectedUser ?? (await this.usersRepository.createUser(user));
  }
}
