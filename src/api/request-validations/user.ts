import { Joi } from 'express-validation'
import { Roles, Branch } from '../../domain/user/model'

export const userRegisterSchema = {
    body: Joi.object({
        username: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
        firstname: Joi.string().trim().required(),
        lastname: Joi.string().trim().required(),
        branch: Joi.valid(...Object.values(Branch)).required(),
        roles: Joi.valid(...Object.values(Roles)).required(),
    }),
}

export const userLoginSchema = {
    body: Joi.object({
        username: Joi.string().trim().required(),
        password: Joi.string().trim().required(),
    }),
}
