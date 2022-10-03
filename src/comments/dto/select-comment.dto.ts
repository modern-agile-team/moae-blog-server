import { Prisma } from '@prisma/client';

export class SelectCommentDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.commentWhereUniqueInput;
  orderBy?: Prisma.commentOrderByWithRelationInput;
}
