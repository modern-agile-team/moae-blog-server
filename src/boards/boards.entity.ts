import { ApiProperty, PickType } from '@nestjs/swagger';
import { board as BoardModel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsEntity
  extends PickType(PrismaService, ['board'])
  implements BoardModel
{
  @ApiProperty({
    description: 'index',
    required: true,
  })
  id: number;

  @ApiProperty({
    description: 'title',
    required: true,
  })
  title: string;

  @ApiProperty({
    description: 'user index',
    required: true,
  })
  userId: number;

  @ApiProperty({
    description: '게시판 내용',
    required: true,
  })
  context: string;

  @ApiProperty({
    description: '생성 시간',
    required: true,
    default: new Date(Date.now()),
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정 시간',
    required: true,
  })
  updatedAt: Date;
}
