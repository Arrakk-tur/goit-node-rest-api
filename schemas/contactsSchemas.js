import Joi from "joi";
import {emailRegexp} from "../constants/constants.js";

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().pattern(emailRegexp).required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean().default(false)
})

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(50),
    email: Joi.string().pattern(emailRegexp),
    phone: Joi.string(),
    favorite: Joi.boolean()

})

export const updateStatusContactSchema = Joi.object({
    favorite: Joi.boolean().required()
})