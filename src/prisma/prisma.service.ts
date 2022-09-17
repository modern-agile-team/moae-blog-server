import { Injectable, OnModuleInit, INestApplication, Logger } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, 'query' | 'error'>
  implements OnModuleInit
{
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });
  }
  async onModuleInit() {
    await this.$connect();

    this.$on('query', (event) => {
      this.logger.verbose(event.query, event.duration);
    });

    this.$on('error', (event) => {
      this.logger.verbose(event.target);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async findUserById(id: number) {
    return await this.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async insert(data: any) {
    return await this.user.create({
      data,
    });
  }
}
