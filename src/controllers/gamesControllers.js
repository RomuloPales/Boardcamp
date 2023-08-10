import db from "../database/db.js";

export async function insertNewGame(req, res){
    const Newgame = res.locals.game;
    try {
        await db.query('INSERT INTO GAMES (name, image, "stockTotal", "categoryId", "pricePerDay") values ($1, $2, $3, $4, $5)', [
            Newgame.name,
            Newgame.image,
            Newgame.stockTotal,
            Newgame.categoryId,
            Newgame.pricePerDay
        ]);
        res.sendStatus(201);
    }
    catch (err) {
        res.status(400).send(err.message);
        
    }
}

export async function getAllGames(req, res) {

    try {
        const {rows} = await db.query('SELECT * FROM GAMES');
        res.send(rows).status(200);
    }catch {
        res.sendStatus(500);
    }
}