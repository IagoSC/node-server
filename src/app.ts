import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import "reflect-metadata";

import "./database";
import "./shared/container";

import { AppError } from "./errors/AppError";
import { authenticateRoutes } from "./routes/authenticate.routes";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationRoutes } from "./routes/specification.routes";
import { usersRoutes } from "./routes/users.routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/categories", categoriesRoutes);
app.use("/users", usersRoutes);
app.use("/specifications", specificationRoutes);
app.use(authenticateRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }
  return res.status(500).json({
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(3333, () => {
  console.log("Server rodando");
});

export { app };
