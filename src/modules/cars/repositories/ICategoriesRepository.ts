import { Category } from "../models/Category";

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepository {
  create: (data: ICreateCategoryDTO) => void;
  getAll: () => Category[];
  getByName: (name: string) => Category;
}
