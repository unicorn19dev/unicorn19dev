import * as Joi from 'joi';
export const registerValidation = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).max(16).required(),
  type: Joi.string().valid('admin', 'doctor', 'client'),
  codeId: Joi.alternatives().conditional('type', {
    is: 'doctor',
    then: Joi.string().min(7).required(),
  }),
  city: Joi.alternatives().conditional('type', {
    is: 'doctor',
    then: Joi.string().required(),
  }),
  address: Joi.alternatives().conditional('type', {
    is: 'doctor',
    then: Joi.string().required(),
  }),
  phone: Joi.alternatives().conditional('type', {
    is: 'doctor',
    then: Joi.object({
      code: Joi.string().required(),
      phoneNumber: Joi.string().required,
    }).required(),
  }),
  medicalCode: Joi.alternatives().conditional('type', {
    is: 'doctor',
    then: Joi.string().required(),
  }),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string().min(8).max(16).required(),
});
