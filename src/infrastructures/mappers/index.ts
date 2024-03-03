import { Entity } from '../domain/entity'

export interface Mapper<M extends Entity, S> {
    toModel(schema: S): M
    toDocument(model: M): S
}
