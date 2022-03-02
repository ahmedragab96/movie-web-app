interface Config {
    jwtSecret: string;
    redisPort: number;
    redisHost: string;
    OMDBToken: string;
    OMDBBaseUrl: string;
    cacheExpirationTime: number;
}

export const config: Config = {
    jwtSecret: process.env.JWT_SECRET,
    redisPort: +process.env.REDIS_PORT,
    redisHost: process.env.REDIS_HOST,
    OMDBToken: process.env.MOVIES_ACCESS_KEY,
    OMDBBaseUrl: process.env.MOVIES_BASE_URL,
    cacheExpirationTime: +process.env.CACHE_EXPIRATION_TIME,
};
