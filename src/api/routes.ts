import { Router as ExpressRouter, Response } from "express";

import Container, { ProviderName } from "../infrastructures/di/container";
import authenRole from "./middlewares/authen";
import { MarketingController } from "./controllers/marketing";

export interface Router {
  route(): ExpressRouter;
}

const registedRouter = (container: Container): ExpressRouter => {
  const router = ExpressRouter({ caseSensitive: false });
  const marketingController: MarketingController = container.getInstance(
    ProviderName.MARKETING_CONTROLLER
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

  // super-admin
  // router.use(authenRole(container, ['super-admin']))
  router.use("/marketing", marketingController.route());

  return router;
};

export default registedRouter;
