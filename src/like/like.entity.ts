import { ApiProperty, PickType } from '@nestjs/swagger';
import { PrismaService } from '../prisma/prisma.service';
import { like_rel as LikeModel } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LikeEntity extends PickType(PrismaService, ['like_rel']) implements LikeModel {
  count: number;

  @ApiProperty({ description: 'index', required: true })
  id: number;

  @ApiProperty({ description: 'user index', required: true })
  userId: number;

  @ApiProperty({ description: 'board index', required: true })
  boardId: number;

  @ApiProperty({ description: '생성 시간', required: true, default: new Date(Date.now()) })
  createdAt: Date;
}
