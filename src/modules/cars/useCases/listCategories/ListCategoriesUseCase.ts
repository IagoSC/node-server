import { Category } from "../../models/Category";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.getAll();
    return categories;
  }
}
