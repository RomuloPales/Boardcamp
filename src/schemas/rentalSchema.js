import joi from "joi";

export const rentalsSchemaValidate = joi.object({
  customerId: joi.number().required(),
  gameId: joi.number().required(),
  rentDate: joi.date().required(),
  daysRented: joi.number().required(),
  returnDate: joi.date().required(),
  originalPrice: joi.number().required(),
  delayFee: joi.number().required(),
});
