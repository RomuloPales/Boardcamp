import joi from 'joi';

export const gamesSchema = joi.object({
  name: joi.string().min(2).required(),
  image: joi.string().required(),
  stockTotal: joi.nummber().positive().required(),
  pricePerDay: joi.number().positive().required(),
  categoryId: joi.number().required(),
});