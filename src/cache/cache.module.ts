import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { RedisConfigService } from './cache.config';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [RedisConfigService],
  providers: [CacheService],
  exports: [CacheService, ConfigService],
})
export class CacheModule {}
