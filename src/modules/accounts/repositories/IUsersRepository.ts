import { ICreateUserDTO } from "../DTOs/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<void>;
  getByEmail(email: string): Promise<User>;
  getById(id: string): Promise<User>;
}

export { IUsersRepository };
