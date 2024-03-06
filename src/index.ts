import "source-map-support/register";
import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./api/routes";
import errorHandler from "./api/middlewares/error-handler";
import Container from "./infrastructures/di/container";

const app = express();

const preload = async () => {
  return {
    container: await Container.initialize(),
  };
};

preload().then(({ container }) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use("/docs", (_: Request, res: Response, next: NextFunction) => {
    if (process.env.NODE_ENV !== "production") {
      next();
    } else {
      res.sendStatus(404);
    }
  });
  app.use(router(container));
  app.use(errorHandler());
});

export default app;
