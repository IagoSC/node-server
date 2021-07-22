import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface ICreateSpecificationUseCase {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute({ description, name }: ICreateSpecificationUseCase): void {
    const existingSpecification = this.specificationRepository.getByName(name);

    if (!name || !description) throw new Error("Invalid Data");
    if (existingSpecification) throw new Error("Specification already exists");

    this.specificationRepository.create({ name, description });
  }
}
