import { Request, Response } from "express";

import { ListSpecificationUseCase } from "./ListSpecificationUseCase";

export class ListSpecificationController {
  constructor(private listSpecificationUseCase: ListSpecificationUseCase) {}

  handle(req: Request, res: Response): Response {
    const specifications = this.listSpecificationUseCase.execute();

    return res.status(200).send(specifications);
  }
}
