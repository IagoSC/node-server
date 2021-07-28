import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface ICreateSpecificationUseCase {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) {}

  async execute({
    description,
    name,
  }: ICreateSpecificationUseCase): Promise<void> {
    const existingSpecification = await this.specificationsRepository.getByName(
      name
    );

    if (!name || !description) throw new AppError("Missing Data");
    if (existingSpecification)
      throw new AppError("Specification already exists", 409);

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
