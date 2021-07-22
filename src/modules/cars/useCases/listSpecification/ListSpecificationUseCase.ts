import { Specification } from "../../models/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

class ListSpecificationUseCase {
  constructor(private specificationRepository: ISpecificationsRepository) {}

  execute(): Specification[] {
    return this.specificationRepository.getAll();
  }
}

export { ListSpecificationUseCase };