import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "../redis/redis";

export const contactRateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "10 m"), // 3 requests per IP every 10 minutes
  prefix: "contact",
});