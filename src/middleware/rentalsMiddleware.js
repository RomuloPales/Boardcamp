import {rentalsSchemaValidate} from "../schemas/rentalSchema.js";
import db from "../database/db.js";
import dayjs from "dayjs";

export async function validateSchemarentals(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const game = db.query(`SELECT * FROM games WHERE id = $1 `, [gameId]);

    if (game.rowCount === 0) {
      return res.sendStatus(400);
    }

    const rental = {
      customerId,
      gameId,
      daysRented,
      rentDate: dayjs().format("DD/MM/YYYY"),
      originalPrice: daysRented * game.rows[0].pricePerDay,
      returnDate: null,
      delayFee: null,
    };
    const { error } = rentalsSchemaValidate.validate(rental, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    const customerExist = db.query(`SELECT * FROM customers WHERE id = $1`, [
      customerId,
    ]);

    if (customerExist.rowCount === 0) {
      return res.sendStatus(400);
    }

    res.locals.rental = rental;
    res.locals.game = game;
    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function gamesInStock(req, res, next) {
  const { game} = res.locals.game;

  try {
    const rentals = db.query(`SELECT * FROM rentals WHERE "gameId" = $1`, [game.id]);

    if (rentals.rows.length >= game.stockTotal) {
      return res.sendStatus(400);
    }
    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}
