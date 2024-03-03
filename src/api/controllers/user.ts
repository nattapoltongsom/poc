import { Request, Response, Router as ExpressRouter } from "express";
import { Router } from "../routes";
import {
  UserService,
  CreateUserInput,
  GetUserInput,
} from "../../domain/user/service";
import { Domain } from "../../domain";
import { userRegisterSchema } from "../request-validations/user";
import requestValidation from "../middlewares/request-validation-handler";

export class UserController implements Router {
  constructor(private readonly userService: UserService) {}
  public route(): ExpressRouter {
    const router = ExpressRouter();
    router.get("/me", this.getMe);
    router.post(
      "/register",
      requestValidation(userRegisterSchema, Domain.USER),
      this.create
    );
    router.route("/sales-count");
    return router;
  }
  public async getMe(req: Request, res: Response) {
    const { userId } = res.locals;
    const input: GetUserInput = {
      id: userId,
    };
    const data = await this.userService.getUser(input);
    res.status(200);
    res.json({ data });
  }

  public async create(req: Request, res: Response) {
    const { username, password, roles, firstname, lastname, branch } = req.body;
    const input: CreateUserInput = {
      username,
      password,
      roles,
      firstname,
      lastname,
      branch,
    };
    const data = await this.userService.createUser(input);
    res.status(200);
    res.json({ data });
  }
}
