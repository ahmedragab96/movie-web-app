import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { SearchParams } from "../../models/movieModel";
import { MoviesService } from "../../services/movies";

const moviesService = MoviesService.Instance;

const getMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.query;
    if (!params.text) {
        throw 'search text is required';
    }
    const movies = await moviesService.getMovies(params as unknown as SearchParams);
    return res.status(httpStatus.CREATED).json({
      code: httpStatus[200],
      message: "Successfully retrieved movies.",
      movies,
    });
  } catch (error) {
    return res.status(400).json({
        message: error,
    });
  }
};

export { getMovies };
