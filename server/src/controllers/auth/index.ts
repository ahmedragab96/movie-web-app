import {
    NextFunction, Request, Response,
  } from "express";
  import httpStatus from "http-status";
  import {
    AuthService,
  } from "../../services/auth";
  
  
  const authService = AuthService.Instance;
  
  const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
  
      const user = await authService.register(userData);
      
      return res.status(httpStatus.CREATED).json({
        code: httpStatus.CREATED,
        message: "Successfully registered user.",
        data: {
          user
        },
      });
    } catch (error) {
      return next(error);
    }
  };
  
  
  export {
    register
  };