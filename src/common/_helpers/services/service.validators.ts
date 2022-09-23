import * as Joi from 'joi';

export const createService = Joi.object({
	name: Joi.string().required(),
	price: Joi.number().required(),
	benefits: Joi.array().items(Joi.string()).required(),
});
