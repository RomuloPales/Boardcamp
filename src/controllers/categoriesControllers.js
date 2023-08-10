import db from "../database/db.js";

export async function createCategory(req, res) {
  const categorie = res.locals.categorie;
  try {
    await db.query("INSERT INTO categories (name) values ($1)", [
      categorie.name,
    ]);
    res.sendStatus(201);
  } catch (err) {
    res.status(400).send(err.message);
    console.log(categorie);
  }
}

export async function listCategories(req, res) {
  
 try {
  const categories = await db.query("SELECT * FROM categories");
    res.send(categories.rows).status(200);
  }
  catch (err) {
    res.status(400).send(err.message);
  }
}
