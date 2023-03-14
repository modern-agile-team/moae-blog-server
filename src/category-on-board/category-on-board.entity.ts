import { ApiProperty, PickType } from '@nestjs/swagger';
import { categories_on_boards as CategoryOnBoardModel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryOnBoardEntity
  extends PickType(PrismaService, ['categories_on_boards'])
  implements CategoryOnBoardModel
{
  @ApiProperty({ description: 'index', required: true })
  boardId: number;

  @ApiProperty({ description: 'index', required: true })
  categoryId: number;
}
