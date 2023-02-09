import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUserSwagger } from 'src/common/decorators';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @GetUserSwagger()
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Get(':userId')
  async getUser(@CurrentUser() userId: number) {
    return await this.usersService.getUser(userId);
  }
}
