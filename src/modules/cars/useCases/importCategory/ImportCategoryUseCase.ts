import csvParse from "csv-parse";
import fs from "fs";

import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportCategories {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private categoryRepository: CategoriesRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategories[]> {
    return new Promise((resolve, reject) => {
      const categories: IImportCategories[] = [];

      const stream = fs.createReadStream(file.path);

      const parseFile = csvParse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;

          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async (category) => {
      const existCategory = this.categoryRepository.getByName(category.name);
      if (!existCategory) this.categoryRepository.create(category);
    });
  }
}

export { ImportCategoryUseCase };
