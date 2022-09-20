import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorator/current-user.decorator';
import { CurrentUserDto } from './dto/current-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Google Login - Redirect path /users/google/redirect
   */
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google')
  signInWithGoogle(): void {
    return;
  }

  /**
   * Google Login - 로그인한 유저 정보 저장
   * @param currentUser { accessToken, name, email, baseUrl }
   * @returns accessToken
   */
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google/redirect')
  async signInWithGooglenRedirect(
    @CurrentUser() { accessToken, ...user }: CurrentUserDto,
  ): Promise<object> {
    await this.usersService.signInUser(user);

    return { accessToken };
  }
}
