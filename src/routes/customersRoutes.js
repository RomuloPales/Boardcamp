import express from "express";
import cors from "cors";
import {
    insertNewCustomers,
    getAllCustomers,getCustomerById, updateCustomer
} from "../controllers/customersControllers.js";
import {validateCustomers} from "../middleware/customersMiddleware.js"


const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/customers", validateCustomers, insertNewCustomers);
router.get("/customers", getAllCustomers);
router.get("/customers/:id", getCustomerById);
router.patch("/customers/:id", updateCustomer);

export default router;
