import express from "express";
import cors from "cors";
import {
  createCategory,
  listCategories,
} from "../controllers/categoriesControllers.js";
import {validateCategories} from "../middleware/categoriesMiddleware.js"


const router = express.Router();

router.use(cors());
router.use(express.json());

router.post("/categories", validateCategories, createCategory);
router.get("/categories", listCategories);

export default router;
