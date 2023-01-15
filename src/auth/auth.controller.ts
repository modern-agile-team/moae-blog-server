import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { CacheService } from '../cache/cache.service';
import { ApiTags } from '@nestjs/swagger';
import {
  GetGoogleAuthSwagger,
  GetGoogleRedirectSwagger,
  RefreshTokenSwagger,
} from '../common/decorators/compose-swagger.decorator';

@ApiTags('auth API')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * Google Login - Redirect path /users/google/redirect
   */
  @GetGoogleAuthSwagger()
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
  @GetGoogleRedirectSwagger()
  @UseGuards(AuthGuard('google'))
  @HttpCode(HttpStatus.OK)
  @Get('google/redirect')
  @Redirect('https://moae-blog.vercel.app', 301)
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

    await this.cacheService.set(userInfo.id.toString(), refreshToken, 604800);
    return;
  }

  /**
   * LoginState - 로그인 상태 유지를 위한 refresh token 통한 재발급
   * @header  bearer refresh token
   * @returns body (accessToken, refreshToken)
   *
   */
  @RefreshTokenSwagger()
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

    const redisRefreshToken = await this.cacheService.get(sub);

    if (!redisRefreshToken) {
      const refreshToken = await this.authService.setRefreshToken({
        sub,
        authCode,
      });
      await this.cacheService.set(sub, refreshToken, 604800);

      return { accessToken, refreshToken };
    }
    return { accessToken, refreshToken };
  }
}
