import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsNumber } from 'class-validator';

export class RequestLikeDto implements Prisma.like_relWhereInput {
  @Type(() => Number)
  @Expose({ name: 'board' })
  @IsNumber()
  @ApiProperty({ name: 'boardId', description: '글 번호' })
  boardId: number;

  @Type(() => Number)
  @ApiProperty({ name: 'userId', description: '사용자 uid' })
  userId: number;
}
