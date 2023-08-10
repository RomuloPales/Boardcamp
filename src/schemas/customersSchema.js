import joi from 'joi';

export const customersSchemaValidate = joi.object({
  name: joi.string().min(2).required(),
  phone: joi.string().max(12).required(),
  cpf: joi.string().min(1).max(12).required(),
  birthday: joi.date().required(),
}); 