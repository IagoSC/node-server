import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface ICreateCategoryUseCase {
  name: string;
  description: string;
}

export class CreateCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute({ description, name }: ICreateCategoryUseCase): Promise<void> {
    const existingCategory = await this.categoriesRepository.getByName(name);

    console.log("exists??", existingCategory);

    if (existingCategory) throw new Error("Category already exists");
    if (!name || !description) throw new Error("Invalid Data");
    await this.categoriesRepository.create({ name, description });
  }
}
