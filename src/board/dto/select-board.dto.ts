import { Prisma } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SelectBoardDto {
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @ApiProperty({ default: 0, description: 'n번째부터 조회' })
  skip = 0;

  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ default: 20, description: '표시할 페이지 수' })
  take = 20;

  @IsOptional()
  @ApiProperty({ name: 'order', default: 'desc', description: 'desc or asc' })
  @Expose({ name: 'order' })
  orderBy?: Prisma.SortOrder;
}
