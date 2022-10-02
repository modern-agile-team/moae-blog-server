import { CacheModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-ioredis';

export const cacheModule = CacheModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    store: redisStore,
    host: configService.get<string>('REDIS_HOST'),
    port: +configService.get<number>('REDIS_PORT'),
    isGlobal: true,
  }),
});
