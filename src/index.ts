import "source-map-support/register";
import "express-async-errors";

import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import cors from "cors";

import router from "./api/routes";
import errorHandler from "./api/middlewares/error-handler";

import Container from "./infrastructures/di/container";

const swaggerDocument = YAML.load(path.resolve(__dirname, "swagger.yaml"));
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
  app.use(
    "/docs",
    (_: Request, res: Response, next: NextFunction) => {
      if (process.env.NODE_ENV !== "production") {
        next();
      } else {
        res.sendStatus(404);
      }
    },
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );
  app.use(router(container));
  app.use(errorHandler());
});

export default app;
