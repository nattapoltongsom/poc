import { User } from './model'

export interface GetUserSchema {
    id: string
    username: string
    password?: string
    firstname: string
    lastname: string
    branch: string
    roles: string[]
}

export const getUserDto = (model: User): GetUserSchema => {
    return {
        id: model.getId(),
        username: model.getUsername(),
        firstname: model.getFirtstname(),
        lastname: model.getLastname(),
        branch: model.getBranch(),
        roles: model.getRole(),
    }
}
