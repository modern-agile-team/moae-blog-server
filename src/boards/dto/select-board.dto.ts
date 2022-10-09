import { Prisma } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class SelectBoardDto {
  @IsOptional()
  skip = 10;

  @IsOptional()
  take = 0;

  @IsOptional()
  cursor?: Prisma.boardWhereUniqueInput;

  @IsOptional()
  where?: Prisma.boardWhereInput;

  @IsOptional()
  orderBy?: Prisma.boardOrderByWithRelationInput;
}
