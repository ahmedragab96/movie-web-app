import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { getHashCache } from "../../redis";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let accessToken;
    const authHeader = req.headers.authorization;
    if (
      authHeader &&
      authHeader.split(" ")[0] === "Bearer" &&
      authHeader.split(" ")[1]
    ) {
      accessToken = authHeader.split(" ")[1];
    } else {
      throw "Unauthorized Access";
    }
    const decoded: any = jwt.verify(accessToken, config.jwtSecret);
console.log(decoded);

    const user = await getHashCache(decoded.id);
    console.log(user);
    

    // access denied if user doesn't exist
    if (!user) {
      throw "Unauthorized Access";
    }

    console.log(user);
    next();
  } catch (error) {
    return res.status(401).json({
      message: error,
    });
  }
};
