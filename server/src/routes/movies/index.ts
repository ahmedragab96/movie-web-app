import express, { Router as ExpressRouter } from "express";

import * as moviesController from "../../controllers/movies";
import { authMiddleware } from "../../middlewares/auth";

const Router: ExpressRouter = express.Router();

Router.route("/").get(
  authMiddleware,
  moviesController.getMovies,
);

export { Router };
