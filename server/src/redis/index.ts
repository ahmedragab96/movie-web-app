// eslint-disable-next-line @typescript-eslint/no-var-requires
const asyncRedis = require("async-redis");
import { config } from '../config';

const client = asyncRedis.createClient(config.redisPort);
const expirationTime = 300; //second
const movieKeyFormat = "movie.id=";

client.on("error", function (err) {
  console.log("Error " + err);
});

export async function setCache(movieId: string, data: any) {
  const key = movieKeyFormat + movieId;
  return await set(key, JSON.stringify(data));
}

async function set(key: string, data: any) {
  await client.setex(key, expirationTime, data);
}

export async function getCache(movieId: string) {
  const key = movieKeyFormat + movieId;
  const data = await get(key);
  return JSON.parse(data);
}

async function get(key: string) {
  return await client.get(key);
}

export async function clearCache(movieId: string) {
  const key = movieKeyFormat + movieId;
  return await clear(key);
}

async function clear(key: string) {
  return await client.del(key);
}

export async function setHashCache(key: string, data: any) {
  return await client.hmset(key, data);
}

export async function getHashCache(key: string) {
  return await client.hgetall(key);
}

