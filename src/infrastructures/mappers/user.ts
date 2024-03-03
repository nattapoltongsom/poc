import { User } from "../../domain/user/model";

export interface UserSchema {
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  branch: string;
  roles: string[];
  created_date: Date;
  updated_date: Date;
}

export class UserMap {
  public static toModel(schema: UserSchema): User {
    const {
      id,
      username,
      password,
      firstname,
      lastname,
      branch,
      roles,
      created_date,
      updated_date,
    } = schema;
    const user = new User(
      username,
      password,
      firstname,
      lastname,
      branch,
      roles
    );

    return Object.assign(user, {
      id,
      createdDate: created_date,
      updatedDate: updated_date,
    });
  }
  public static toDocument(model: User): UserSchema {
    return {
      id: model.getId(),
      username: model.getUsername(),
      password: model.getPassword(),
      firstname: model.getFirtstname(),
      lastname: model.getLastname(),
      branch: model.getBranch(),
      roles: model.getRole(),
      created_date: model.getCreatedDate(),
      updated_date: model.getUpdatedDate(),
    };
  }
}
