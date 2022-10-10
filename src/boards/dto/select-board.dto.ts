import { Prisma } from '@prisma/client';
import { Expose, Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SelectBoardDto {
  @IsOptional()
  @Type(() => Number)
  skip = 0;

  @IsOptional()
  @Type(() => Number)
  take = 20;

  @IsOptional()
  @Expose({ name: 'order' })
  orderBy?: Prisma.SortOrder;
}
