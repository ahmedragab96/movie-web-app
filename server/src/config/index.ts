interface Config {
    jwtSecret: string;
    redisPort: number;
}

export const config: Config = {
    jwtSecret: process.env.JWT_SECRET,
    redisPort: +process.env.REDIS_PORT,
};
