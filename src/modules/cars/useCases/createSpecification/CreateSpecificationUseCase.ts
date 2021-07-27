import { inject, injectable } from "tsyringe";

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

    if (!name || !description) throw new Error("Invalid Data");
    if (existingSpecification) throw new Error("Specification already exists");

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
