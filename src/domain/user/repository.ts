import { User } from './model'

export interface UserRepository {
    getList(): Promise<User[]>
    getById(id: string): Promise<User>
    create(model: User): Promise<string>
    getByUsername(username: string): Promise<User>
    getIsUsernameExists(username: string): Promise<boolean>
}
