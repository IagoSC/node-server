import { Specification } from "../infra/typeorm/entities/Specification";

export interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create(data: ICreateSpecificationDTO): Promise<void>;
  getAll(): Promise<Specification[]>;
  getByName(name: string): Promise<Specification>;
}
