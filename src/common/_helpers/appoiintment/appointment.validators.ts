import * as Joi from 'joi';

export const createAppointment = Joi.object({
	date: Joi.required(),
	time: Joi.required(),
	city: Joi.required(),
	address: Joi.required(),
	reference: Joi.required(),
});
