// eslint-disable-next-line @typescript-eslint/no-var-requires
const asyncRedis = require("async-redis");
import { config } from '../config';

const client = asyncRedis.createClient(config.redisPort, config.redisHost);

client.on("error", function (err) {
  console.log("Error : " + err);
});

export async function setCache(searchParams: string, data: any) {
  return await client.setex(searchParams, config.cacheExpirationTime, JSON.stringify(data));
}

export async function getCache(searchParams: string) {
  const data = await client.get(searchParams);
  return JSON.parse(data);
}

export async function clearCache(key: string) {
  return await client.del(key);
}

export async function setHashCache(key: string, data: any) {
  return await client.hmset(key, data);
}

export async function getHashCache(key: string) {
  return await client.hgetall(key);
}

