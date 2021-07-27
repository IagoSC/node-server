import express from "express";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";

import "./database";
import "./shared/container";

import { categoriesRoutes } from "./routes/categories.routes";
import { specificationRoutes } from "./routes/specification.routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/categories", categoriesRoutes);
app.use("/specifications", specificationRoutes);

app.listen(3333, () => {
  console.log("Server rodando");
});

export { app };
