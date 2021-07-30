import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    // Does user exists
    const user = await this.usersRepository.getByEmail(email);
    if (!user) throw new AppError("Email or password incorrect", 401);

    // Is password correct
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw new AppError("Email or password incorrect", 401);

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
