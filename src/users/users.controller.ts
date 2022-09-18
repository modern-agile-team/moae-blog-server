import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorator/current-user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*
  ###### 구글 로그인 API
  */
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google')
  googleSignIn(): void {
    return;
  }

  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google/redirect')
  async googleSignInRedirect(@CurrentUser() user): Promise<any> {}
}
