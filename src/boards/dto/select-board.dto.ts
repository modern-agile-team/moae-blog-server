import { Prisma } from '@prisma/client';

export class SelectBoardDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.boardWhereUniqueInput;
  where?: Prisma.boardWhereInput;
  orderBy?: Prisma.boardOrderByWithRelationInput;
}
