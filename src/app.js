import express from "express";
import cors from "cors";
import router from "./routes/categoriesRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import gamesRoutes from "./routes/gamesRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


app.use(categoriesRoutes)
app.use(gamesRoutes)


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server is running on port ${port}`));