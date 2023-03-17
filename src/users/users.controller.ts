import { Controller, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { GetUserSwagger, User } from 'src/common/decorators';
import { TokenDto } from 'src/common/dtos/token.dto';
import { UsersService } from './users.service';

@ApiTags('User API')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GetUserSwagger()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  @Get(':userId')
  async getUser(@User() { sub }: TokenDto) {
    return await this.usersService.getUser(sub);
  }
}
