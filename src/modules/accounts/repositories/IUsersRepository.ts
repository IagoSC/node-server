import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";
import { User } from "../entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  getByEmail(email: string): Promise<User>;
  getById(id: string): Promise<User>;
}

export { IUsersRepository };
