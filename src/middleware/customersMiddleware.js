import { customersSchemaValidate } from "../schemas/customersSchema.js";
import db from "../database/db.js";

export async function validateCustomers(req, res, next) {
  const customer = req.body;

  const { error } = customersSchemaValidate.validate(customer, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send({ errors });
  }

  const cpfExist = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [
    customer.cpf,
  ]);
  if (cpfExist.rows.length > 0) {
    return res.sendStatus(409);
  }
  res.locals.customer = customer;
  next();
}
