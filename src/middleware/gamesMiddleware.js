import { gamesSchema } from "../schemas/gamesSchema.js";
import db  from "../database/db.js";

export async function validateSchemaGames(req, res, next) {
  const game = req.body;
  console.log(game)
  const { error } = gamesSchema.validate(game, {
    abortEarly: false,
  });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send({ errors });
  }

  const idCategorieExist = await db.query(
    `SELECT * FROM categories WHERE id = $1`,
    [game.categoryid]
  );

  if (idCategorieExist.rows.length > 0) {
    return res.sendStatus(400);
  }

  const nameGameExist = await db.query(`SELECT * FROM games WHERE name = $1`, [
    game.name,
  ]);

  if (nameGameExist.rows.length > 0) {
    return res.sendStatus(409);
  }
  console.log(game)
  res.locals.game = game;
  next();
}
