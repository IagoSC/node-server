import { Category } from "../infra/typeorm/entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  create: (data: ICreateCategoryDTO) => Promise<void>;
  getAll: () => Promise<Category[]>;
  getByName: (name: string) => Promise<Category>;
}
