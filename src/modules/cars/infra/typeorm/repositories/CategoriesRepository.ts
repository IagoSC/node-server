import { getRepository, Repository } from "typeorm";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../../../repositories/ICategoriesRepository";
import { Category } from "../entities/Category";

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name,
    });

    await this.repository.save(category);
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async getByName(name: string): Promise<Category> {
    // SELECT * FROM categories WHERE NAME = "name"
    const category = await this.repository.findOne({ name });
    return category;
  }
}
