import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from '../../config';
import { getHashCache } from '../../redis';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let accessToken;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.split(' ')[0] === 'Bearer' && authHeader.split(' ')[1]) {
          accessToken = authHeader.split(' ')[1];
        } else {
            throw new Error('Unauthorized Access');
        }
        const decoded: any = jwt.verify(accessToken, config.jwtSecret);
    
        const user = await getHashCache(decoded.id);
    
        // access denied if user doesn't exist
        if (!user) {
            throw new Error('Unauthorized Access');
        }
    
        console.log(user);
        next();
      } catch (error) {
        next(error);
      }
};