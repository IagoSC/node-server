import { Router } from "express";

import { createSpecificationController } from "../modules/cars/useCases/createSpecification";
import { listSpecificationController } from "../modules/cars/useCases/listSpecification";

export const specificationRoutes = Router();

specificationRoutes.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});

specificationRoutes.get("/", (req, res) => {
  return listSpecificationController.handle(req, res);
});
