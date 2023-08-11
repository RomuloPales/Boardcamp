import joi from "joi";

export const rentalsSchema = joi.object({
  customerId: joi.string().required(),
  gameId: joi.string().required(),
  rentDate: joi.date().required(),
  daysRented: joi.number().required(),
  categoryId: joi.number().required(),
  returnDate: joi.date().required(),
});
