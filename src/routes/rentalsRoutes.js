import express from "express";
import cors from "cors";
import {
    validateSchemarentals,
    gamesInStock,
} from "../middleware/rentalsMiddleware.js";
import { createNewRental, getAllRentals,returnRental, deleteGame } from "../controllers/rentalControllers.js";


const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/rentals", validateSchemarentals,gamesInStock, createNewRental);
router.get("/rentals", getAllRentals);
router.post("/rentals/:id/return", returnRental);
router.delete("/rentals/:id", deleteGame);
export default router;
