import db from "../database/db.js";

export async function createNewRental(req, res) {
  const {
    customerId,
    gameId,
    daysRented,
    rentDate,
    originalPrice,
    returnDate,
    delayFee,
  } = res.locals.rental;
  try {
    await db.query(
      `INSERT INTO rentals 
      ("customerId", 
      "gameId", 
      "daysRented", 
      "rentDate", 
      "originalPrice", 
      "returnDate", 
      "delayFee") 
      values 
      ($1, $2, $3, $4, $5, $6, $7)`,
      [
        customerId,
        gameId,
        daysRented,
        rentDate,
        originalPrice,
        returnDate,
        delayFee,
      ]
    );
    res.sendStatus(201);
  } catch (err) {
    res.status(401).send(err.message);
  }
}

export async function getAllRentals(req, res) {
    const { customerId, gameId } = req.query;
    
   console.log(customerId, gameId)
  const globalQuery = 
    `SELECT rentals.*,customers.id AS "IdCustomer", customers.name AS "NameCostumer", games.id AS "GameId" ,games.name AS "gameName", games."categoryId", categories.name AS "categoryName"
        FROM rentals
        JOIN customers 
        ON rentals."customerId" = customers.id 
        JOIN games
        ON rentals."gameId" = games.id
        JOIN categories
        ON games."categoryId" = categories.id
        `;

  try {
    const { rows } = customerId
      ? await db.query(globalQuery + 'WHERE "customerId" =$1', [
        Number(customerId),
    ])
      : gameId
      ? await db.query(globalQuery + `WHERE "gameId" = $1`, [
        Number (gameId),
    ])
      : await db.query(globalQuery);

    res.send(rows).status(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
}
