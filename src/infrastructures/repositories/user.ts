import { UserMap, UserSchema } from '../mappers/user'
import { User } from '../../domain/user/model'
import { UserRepository } from '../../domain/user/repository'
import { BaseRepository } from './base'
import { PostgresPool } from '../db/postgres'
import { Domain } from '../../domain'
import { ErrorCodeMessage } from '../../helpers/errors/error-code-message'
import { ResourceNotFoundError } from '../../helpers/errors/resource-not-found-error'
import moment from 'moment'

export class UserPostgresRepository extends BaseRepository<User, UserSchema> implements UserRepository {
    constructor(private readonly db: PostgresPool) {
        super(UserMap)
    }

    public async create(model: User): Promise<string> {
        const document = this.mapper.toDocument(model)
        const timestamp = new Date()
        Object.assign(document, {
            created_date: moment(timestamp).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
            updated_date: moment(timestamp).format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
        })
        const { id, username, password, firstname, lastname, branch, roles, created_date, updated_date } = document

        const prepare = `INSERT INTO users (${Object.keys(document)}) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)  RETURNING id`
        const result = await this.db.query(prepare, [
            id,
            username,
            password,
            firstname,
            lastname,
            branch,
            roles,
            created_date,
            updated_date,
        ])
        return result?.shift()?.id
    }

    public async getList(): Promise<User[]> {
        const user = await this.db.query(`SELECT * FROM public.users`)
        return user.map((data) => this.mapper.toModel(data))
    }

    public async getById(id: string): Promise<User> {
        const user = await this.db.findOne(`SELECT * FROM public.users where id = $1`, [id])
        if (!user) {
            throw new ResourceNotFoundError({
                domain: Domain.USER,
                codeMessage: ErrorCodeMessage.RESOURCE_NOT_FOUND,
                message: 'User Not Found',
                id,
            })
        }
        return this.mapper.toModel(user)
    }

    public async getIsUsernameExists(username: string): Promise<boolean> {
        return (await this.db.findOne(`SELECT * FROM public.users where username = $1`, [username])) ? true : false
    }

    public async getByUsername(username: string): Promise<User> {
        const user = await this.db.findOne(`SELECT * FROM public.users where username = $1`, [username])
        if (!user) {
            throw new ResourceNotFoundError({
                domain: Domain.USER,
                codeMessage: ErrorCodeMessage.RESOURCE_NOT_FOUND,
                message: 'User Not Found',
            })
        }
        return this.mapper.toModel(user)
    }
}
