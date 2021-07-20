import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();
app.use(express.json());
app.use(categoriesRoutes);

export { app };
