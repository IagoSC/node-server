import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
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

    if (existingCategory) throw new AppError("Category already exists", 409);
    if (!name || !description) throw new AppError("Missing Data");
    this.categoriesRepository.create({ name, description });
  }
}
