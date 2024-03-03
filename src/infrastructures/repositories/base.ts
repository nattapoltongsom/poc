import { Entity } from '../domain/entity'
import { Mapper } from '../mappers'

export class BaseRepository<M extends Entity, S> {
    constructor(protected readonly mapper: Mapper<M, S>) {}
}
