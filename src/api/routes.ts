import { Router as ExpressRouter, Response } from "express";

import Container, { ProviderName } from "../infrastructures/di/container";
import authenRole from "./middlewares/authen";
import redis from "./middlewares/redis";
import { UserController } from "./controllers/user";

export interface Router {
  route(): ExpressRouter;
}

const registedRouter = (container: Container): ExpressRouter => {
  const router = ExpressRouter({ caseSensitive: false });

  const userController: UserController = container.getInstance(
    ProviderName.USER_CONTROLLER
  );

  router.get("/health", (_, res: Response) => res.sendStatus(200));
  router.get("/APP_COMMIT_ID", (_, res: Response) => {
    res.status(200);
    res.json({
      APP_COMMIT_ID: process.env.APP_COMMIT_ID,
    });
  });

  // admin
  router.use(authenRole(container, ["admin"]));
  router.use(redis(container));
  router.use("/users", userController.route());

  return router;
};

export default registedRouter;
