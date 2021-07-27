import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICreateCategoryUseCase {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ description, name }: ICreateCategoryUseCase): Promise<void> {
    const existingCategory = await this.categoriesRepository.getByName(name);

    if (existingCategory) throw new Error("Category already exists");
    if (!name || !description) throw new Error("Invalid Data");
    this.categoriesRepository.create({ name, description });
  }
}
