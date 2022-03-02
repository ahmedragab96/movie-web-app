import express, { Router as ExpressRouter } from "express";
import { Router as authRoutes } from "./auth";
import { Router as moviesRoutes } from "./movies";

const Router: ExpressRouter = express.Router();
Router.use("/auth", authRoutes);
Router.use("/movies", moviesRoutes);

export { Router };
