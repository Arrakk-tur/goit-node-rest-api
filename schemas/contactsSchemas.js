import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().default(false)
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean().default(false)

})

export const updateStatusContactSchema = Joi.object({
    favorite: Joi.boolean().required()
})