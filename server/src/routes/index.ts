import express, { Router as ExpressRouter } from "express";
import { Router as authRoutes } from "./auth";

const Router: ExpressRouter = express.Router();
Router.use("/auth", authRoutes);

export { Router };
