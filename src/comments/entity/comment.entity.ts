import { ApiProperty } from '@nestjs/swagger';
import { comment as CommentModel } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentEntity extends PrismaService implements CommentModel {
  @ApiProperty({
    description: 'index',
    required: true,
    default: false,
  })
  id: number;

  @ApiProperty({
    description: 'user index',
    required: true,
  })
  userId: number;

  @ApiProperty({
    description: 'board index',
    required: true,
  })
  boardId: number;

  @ApiProperty({
    description: '댓글 내용',
    required: true,
  })
  context: string;

  @ApiProperty({
    description: '생성 시간',
    required: true,
    default: Date.now(),
  })
  createdAt: Date;

  @ApiProperty({
    description: '수정 시간',
    required: true,
  })
  updatedAt: Date;
}
