import express from "express";
import cors from "cors";
import {
    insertNewGame,
    getAllGames,
} from "../controllers/gamesControllers.js";
import {validateSchemaGames} from "../middleware/gamesMiddleware.js"


const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/rentals", validateSchemarentals, insertNewrentals);
router.get("/rentals", getAllGames);
router.delete("/rentals/:id", deleteGame);
export default router;
