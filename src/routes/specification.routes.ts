import { Router } from "express";

import { SpecificationsRepository } from "../modules/cars/repositories/implementations/SpecificationsRepository";
import { CreateSpecificationService } from "../modules/cars/services/CreateSpecificationService";

export const specificationRoutes = Router();

const specificationRepository = new SpecificationsRepository();

specificationRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecificationService = new CreateSpecificationService(
    specificationRepository
  );

  createSpecificationService.execute({ name, description });

  res.status(201).send();
});

specificationRoutes.get("/", (req, res) => {
  const all = specificationRepository.getAll();
  res.status(200).send(all);
});
