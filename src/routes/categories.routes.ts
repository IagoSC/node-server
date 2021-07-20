import { Router } from "express";

export const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/categories", (req, res) => {
  const { name, description } = req.body;

  console.log("AAa");

  categories.push({
    name,
    description,
  });

  res.status(201).send();
});
