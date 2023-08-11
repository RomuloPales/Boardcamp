import { rentalsSchemaValidate } from "../schemas/rentalSchema.js";
import db from "../database/db.js";
import dayjs from "dayjs";

export async function validateSchemarentals(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const game = await db.query(`SELECT * FROM games WHERE id = $1 `, [gameId]);
    
    if (game.rowCount === 0) {
      return res.sendStatus(400);
    }
    const rental = {
      customerId,
      gameId,
      rentDate: dayjs().format("YYYY/MM/DD"),
      daysRented,
      returnDate: null,
      originalPrice: daysRented * game.rows[0].pricePerDay,
      delayFee: null,
    };
    
    const { error } = rentalsSchemaValidate.validate(rental, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).send(errors);
    }

    const customerExist = await db.query(
      `SELECT * FROM customers WHERE id = $1`,
      [customerId]
    );

    if (customerExist.rowCount === 0) {
      return res.sendStatus(400);
    }

    res.locals.rental = rental;
    res.locals.game = game.rows[0];
  
    
    next();
  } catch (err) {
    return res.sendStatus(500);
  }
}

export async function gamesInStock(req, res, next) {
  const game = res.locals.game;
  

  try {
    const rentals = await db.query(
      `SELECT * FROM rentals WHERE "gameId" = $1`,
      [game.id]
    );

    if (rentals.rows.length >= game.stockTotal) {
      return res.sendStatus(400);
    }
    next();
  } catch (err) {
   
    return res.sendStatus(500);
  }
}
