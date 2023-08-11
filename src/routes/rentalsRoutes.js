import express from "express";
import cors from "cors";
import {
    validateSchemarentals,
    gamesInStock,
} from "../middleware/rentalsMiddleware.js";


const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/rentals", validateSchemarentals,gamesInStock);
// router.get("/rentals", getAllGames);
// router.delete("/rentals/:id", deleteGame);
export default router;
