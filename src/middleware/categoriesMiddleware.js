import { categoriesSchema } from "../schemas/categoriesSchema.js";
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

  if (categorieExist.rows.length > 0) {
    return res.sendStatus(409);
  }
  res.locals.categorie = categories;
  next();
}
