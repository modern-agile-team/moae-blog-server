import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PrismaClient, ConfigModule.forRoot(), UsersModule],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, PrismaClient],
})
export class AppModule {}
