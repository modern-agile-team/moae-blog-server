import {
  CACHE_MANAGER,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from './decorator/current-user.decorator';
import { CurrentUserDto } from './dto/current-user.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';
import { Cache } from 'cache-manager';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

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
   * @returns cookie (accessToken, refreshToken) redirect 초기 화면 url
   */
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google/redirect')
  @Redirect('http://localhost:8080', 301)
  async signInWithGoogleRedirect(
    @CurrentUser() { ...user }: CurrentUserDto,
    @Res() res: any,
  ): Promise<any> {
    const userInfo = await this.authService.signInUser(user);

    const payload: JwtPayload = {
      sub: userInfo.id.toString(),
      authCode: userInfo.authCode,
    };

    const { accessToken, refreshToken } = await this.authService.setToken(
      payload,
    );

    res.cookie('access-token', accessToken);
    res.cookie('refresh-token', refreshToken);

    await this.cacheManager.set(userInfo.id.toString(), refreshToken, {
      ttl: 604800,
    });
    return;
  }

  /**
   * LoginState - 로그인 상태 유지를 위한 refresh token 통한 재발급
   * @header  bearer refresh token
   * @returns body (accessToken, refreshToken)
   *
   */
  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshToken(@Req() req: any) {
    const { refreshToken, sub, authCode } = req.user as JwtPayload & {
      refreshToken: string;
    };
    const accessToken = await this.authService.setAccessToken({
      sub,
      authCode,
    });

    const redisRefreshToken = await this.cacheManager.get(sub);

    if (!redisRefreshToken) {
      const refreshToken = await this.authService.setRefreshToken({
        sub,
        authCode,
      });
      await this.cacheManager.set(sub, refreshToken, { ttl: 604800 });

      return { accessToken, refreshToken };
    }
    return { accessToken, refreshToken };
  }
}
