import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CurrentUserDto } from 'src/auth/dto/current-user.dto';
import { GetUserSwagger, User } from 'src/common/decorators';
import { UsersService } from './users.service';

@ApiTags('User API')
@ApiBearerAuth('accessToken')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GetUserSwagger()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Get(':userId')
  async getUser(@User() { id }: CurrentUserDto) {
    return await this.usersService.getUser(id);
  }
}
