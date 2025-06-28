import { CacheRepository } from 'src/domain/repositories/cache.repository';
import { RedisService } from 'src/infrastructure/external/redis.service';

export class RedisCacheRepository implements CacheRepository {
  constructor(private readonly redisService: RedisService) { }

  async get(key: string) {
    return this.redisService.get(key);
  }

  async set(key: string, value: string, expire?: number) {
    await this.redisService.set(key, value, expire);
  }
}