import { UserRepository } from "./repository";
import { User } from "../../domain/user/model";
import { GetUserSchema, getUserDto } from "./dto";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { Domain } from "../../domain";
import { ErrorCodeMessage } from "../../helpers/errors/error-code-message";
import { AuthorizeError } from "../../helpers/errors/authorize-error";
import { BadRequestError } from "../../helpers/errors/bad-request-error";
export interface LoginInput {
  username: string;
  password: string;
}
export interface CreateUserInput {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  branch: string;
  roles: string;
}

export interface GetUserInput {
  id: string;
}

export interface LoginRespones {
  id: string;
  token?: string;
}
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  public async getUserList(): Promise<GetUserSchema[]> {
    const usersList = await this.userRepo.getList();
    return usersList.map((item) => getUserDto(item));
  }

  public async getUser(input: GetUserInput): Promise<GetUserSchema> {
    const { id } = input;
    const user = await this.userRepo.getById(id);
    return getUserDto(user);
  }

  public async createUser(input: CreateUserInput): Promise<{ id: string }> {
    const { username, password, roles, firstname, lastname, branch } = input;
    const user = await this.userRepo.getIsUsernameExists(
      username?.toLowerCase()
    );
    if (user) {
      throw new BadRequestError({
        domain: Domain.USER,
        codeMessage: ErrorCodeMessage.BAD_REQUEST,
        message: "User Already Exists",
        fields: [{ error: `${username} Already Exists`, field: "username" }],
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const userModel = new User(
      username.toLowerCase(),
      encryptedPassword,
      firstname.toLowerCase(),
      lastname.toLowerCase(),
      branch,
      [roles]
    );
    const resp = await this.userRepo.create(userModel);
    return { id: resp };
  }

  public async userLogin(input: LoginInput): Promise<LoginRespones> {
    const { username, password } = input;
    const user = await this.userRepo.getByUsername(username?.toLowerCase());

    if (user && !(await bcrypt.compare(password, user.getPassword()))) {
      throw new AuthorizeError({
        domain: Domain.USER,
        codeMessage: ErrorCodeMessage.AUTHENTICATION_FAILED,
        message: "Password Incorrect",
      });
    }
    const jwtSign = {
      id: user.getId(),
      firstname: user.getUsername(),
      lastname: user.getLastname(),
      roles: user.getRole(),
    };

    return {
      id: user.getId(),
    };
  }
}
