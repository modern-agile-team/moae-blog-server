import { ApiProperty, PickType } from '@nestjs/swagger';
import { category as CategoryModel } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryEntity extends PickType(PrismaService, ['category']) implements CategoryModel {
  @ApiProperty({ description: 'index', required: true })
  id: number;

  @ApiProperty({ description: 'name', required: true })
  name: string;

  @ApiProperty({ description: '생성 시간', required: true, default: new Date(Date.now()) })
  createdAt: Date;
}
