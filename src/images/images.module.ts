import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImagesRepository } from './images.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { multerOptionsFactory } from '../common/factories/multer.options';
import { BoardModule } from '../board/board.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: multerOptionsFactory,
      inject: [ConfigService],
    }),
    BoardModule,
  ],
  controllers: [ImagesController],
  providers: [ImagesService, PrismaClient, ImagesRepository],
})
export class ImagesModule {}
