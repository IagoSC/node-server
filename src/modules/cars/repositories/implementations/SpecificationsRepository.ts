import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({ description, name }: ICreateSpecificationDTO): Promise<void> {
    const specification = this.repository.create({ description, name });

    await this.repository.save(specification);
  }

  async getAll(): Promise<Specification[]> {
    const specification = await this.repository.find();
    return specification;
  }

  async getByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }
}

export { SpecificationsRepository };
