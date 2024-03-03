import { v4 as uuid } from 'uuid'
import { Entity } from '../../infrastructures/domain/entity'

export enum Roles {
    ADMIN = 'admin',
}
export enum Branch {
    SIAM = 'siam',
    MAHANAKHON = 'mahanakhon',
}
export class User extends Entity {
    private _username: string
    private _password: string
    private _firstname: string
    private _lastname: string
    private _branch: string
    private _roles: string[]

    constructor(
        username: string,
        password: string,
        firstname: string,
        lastname: string,
        branch: string,
        roles: string[]
    ) {
        super()
        this.id = uuid()

        this._username = username
        this._password = password
        this._firstname = firstname
        this._lastname = lastname
        this._branch = branch
        this._roles = roles
    }

    public getUsername(): string {
        return this._username
    }
    public setUsername(username: string) {
        this._username = username
    }
    public getPassword(): string {
        return this._password
    }
    public setPassword(password: string) {
        this._password = password
    }
    public getFirtstname(): string {
        return this._firstname
    }
    public setFirstname(firstname: string) {
        this._firstname = firstname
    }
    public getLastname(): string {
        return this._lastname
    }
    public setLastname(lastname: string) {
        this._lastname = lastname
    }
    public getBranch(): string {
        return this._branch
    }
    public setBranch(branch: string) {
        this._branch = branch
    }
    public getRole(): string[] {
        return this._roles
    }
    public setRole(roles: string[]) {
        this._roles = roles
    }
}
