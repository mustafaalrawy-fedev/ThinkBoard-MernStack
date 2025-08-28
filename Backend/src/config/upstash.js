import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';
import dotenv from 'dotenv';

dotenv.config();
const { UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN } = process.env;

// create rateLimiter that allows 10 requests per 20 seconds.
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN),
  limiter: Ratelimit.slidingWindow(10, '20 s'),
});

export { ratelimit };
