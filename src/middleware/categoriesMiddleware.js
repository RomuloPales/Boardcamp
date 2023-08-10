import { categoriesSchema } from "../schemas/categories.js";
import db from "../database/db.js";

export async function validateCategories(req, res, next) {
  const categories = req.body;
  const { error } = categoriesSchema.validate(categories, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send({ errors });
  }

  const categorieExist = await db.query(
    `SELECT * FROM categories WHERE name = $1`,
    [categories.name]
  );

  if (categorieExist) {
    res.sendstatus(409);
  }
  res.locals.categories = categories;
  next();
}
