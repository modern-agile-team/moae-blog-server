import { Injectable } from '@nestjs/common';
import { user } from '@prisma/client';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async signInUser(user: CurrentUserDto): Promise<user> {
    const selectedUser: user = await this.usersRepository.selectOneUserByEmail(
      user.email,
    );

    if (!selectedUser) {
      delete user.accessToken;
      return await this.usersRepository.createUser(user);
    }
    return selectedUser;
  }
}
