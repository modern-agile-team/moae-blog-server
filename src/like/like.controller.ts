import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCountDto } from './dto/get-count.dto';
import { RequestLikeDto } from './dto/request-like.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../common/decorators/user.decorator';

@ApiBearerAuth('accessToken')
@ApiTags('like API')
@Controller('likes')
export class LikeController {
  constructor(private readonly likesService: LikeService) {}

  @Get('/count')
  async getCount(@Query() data: GetCountDto): Promise<number> {
    return await this.likesService.getCount(data);
  }

  @Get('/')
  @UseGuards(AuthGuard('jwt'))
  async getOne(@Query() data: RequestLikeDto, @User() userId: number) {
    data.userId = userId;
    return await this.likesService.getOneLike(data);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  async createLike(@Body() data: RequestLikeDto, @User() userId: number) {
    data.userId = userId;
    return await this.likesService.createLike(data);
  }

  @Delete('/')
  @UseGuards(AuthGuard('jwt'))
  async deleteLike(@Body() data: RequestLikeDto, @User() userId: number) {
    data.userId = userId;
    return await this.likesService.deletedLike(data);
  }
}
