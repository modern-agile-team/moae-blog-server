import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    PrismaClient,
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    BoardsModule,
  ],
})
export class AppModule {}
