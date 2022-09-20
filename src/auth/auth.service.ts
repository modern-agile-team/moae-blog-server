import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CurrentUserDto } from './dto/current-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signInUser(user: CurrentUserDto) {
    return await this.usersService.signInUser(user);
  }
}
