import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, data);
    this.users.push(user);
  }
  async getByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }
  async getById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}

export { UsersRepositoryInMemory };
