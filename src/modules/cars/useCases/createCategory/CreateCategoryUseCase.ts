import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICreateCategoryUseCase {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ description, name }: ICreateCategoryUseCase): void {
    const existingCategory = this.categoriesRepository.getByName(name);

    if (existingCategory) throw new Error("Category already exists");

    this.categoriesRepository.create({ name, description });
  }
}
