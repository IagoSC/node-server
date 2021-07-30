import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });
  it("should be able to create a new Category", async () => {
    const nameTest = "Category test";

    await createCategoryUseCase.execute({
      name: nameTest,
      description: "Category description test",
    });

    const categoryCreated = await categoriesRepositoryInMemory.getByName(
      nameTest
    );

    console.log(categoryCreated);
    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new Category with existing name", async () => {
    expect(async () => {
      const nameTest = "Category test";

      await createCategoryUseCase.execute({
        name: nameTest,
        description: "Category description test",
      });

      await createCategoryUseCase.execute({
        name: nameTest,
        description: "Category description test",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
