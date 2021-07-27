import { Category } from "../entities/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  create: (data: ICreateCategoryDTO) => Promise<void>;
  getAll: () => Promise<Category[]>;
  getByName: (name: string) => Promise<Category>;
}
