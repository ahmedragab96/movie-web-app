interface Config {
    jwtSecret: string;
    redisPort: number;
    OMDBToken: string;
    OMDBBaseUrl: string;
    cacheExpirationTime: number;
}

export const config: Config = {
    jwtSecret: process.env.JWT_SECRET,
    redisPort: +process.env.REDIS_PORT,
    OMDBToken: process.env.MOVIES_ACCESS_KEY,
    OMDBBaseUrl: process.env.MOVIES_BASE_URL,
    cacheExpirationTime: +process.env.CACHE_EXPIRATION_TIME,
};
