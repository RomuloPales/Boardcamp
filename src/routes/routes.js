import express from "express";  
import cors from "cors";    
// import { listCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.use(cors());
router.use(express.json());

// router.get("/categories" listCategories);
// router.post("/categories", createCategory);

export default router;