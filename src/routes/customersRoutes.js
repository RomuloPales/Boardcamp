import express from "express";
import cors from "cors";
import {
    insertNewCustomers,
    getAllCustomers,
} from "../controllers/customersControllers.js";
import {validateCustomers} from "../middleware/customersMiddleware.js"


const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/customers", validateCustomers, insertNewCustomers);
router.get("/customers", getAllCustomers);

export default router;
