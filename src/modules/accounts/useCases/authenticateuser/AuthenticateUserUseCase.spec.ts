import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUsecCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUsecCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it("Should be able to authenticate an user", async () => {
    const email = "teste@gmail.com";
    const password = "123456";
    const user: ICreateUserDTO = {
      driver_license: "01234",
      name: "User Test",
      email,
      password,
    };

    await createUserUsecCase.execute(user);

    const result = await authenticateUserUseCase.execute({ email, password });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate user non existent user", () => {
    expect(async () => {
      const email = "teste@gmail.com";
      const password = "123456";

      await authenticateUserUseCase.execute({ email, password });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to authenticate user with wrong password", () => {
    expect(async () => {
      const email = "teste@gmail.com";
      const password = "123457";
      const passwordWrong = "123456";
      const user: ICreateUserDTO = {
        driver_license: "01234",
        name: "User Test",
        email,
        password,
      };
      await createUserUsecCase.execute(user);

      await authenticateUserUseCase.execute({ email, password: passwordWrong });
    }).rejects.toBeInstanceOf(AppError);
  });
});
