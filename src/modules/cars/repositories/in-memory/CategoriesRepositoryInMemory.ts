import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async create(data: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, data);
    this.categories.push(category);
  }

  async getAll(): Promise<Category[]> {
    return this.categories;
  }

  async getByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { CategoriesRepositoryInMemory };
