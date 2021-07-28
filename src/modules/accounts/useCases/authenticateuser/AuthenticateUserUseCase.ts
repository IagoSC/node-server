import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { UsersRepository } from "../../repositories/implementations/UsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Does user exists
    const user = await this.usersRepository.getByEmail(email);
    if (!user) throw new Error("Email or password incorrect");

    // Is password correct
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new Error("Email or password incorrect");

    // Gerar jwt
    const secretKey = "738bedb38982ada51242db73296e7a2d";
    const token = sign({}, secretKey, {
      subject: user.id,
      expiresIn: "12h",
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserUseCase, IResponse };
