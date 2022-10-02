import { Prisma } from '@prisma/client';

export class SelectCommentDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.commentWhereUniqueInput;
  where?: Prisma.commentWhereInput;
  orderBy?: Prisma.commentOrderByWithRelationInput;
}
