import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase, IResponse } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);
    const authenticationInfo = await authenticateUserUseCase.execute({
      email,
      password,
    });

    const returnInfo: IResponse = {
      user: {
        name: authenticationInfo.user.name,
        email: authenticationInfo.user.email,
      },
      token: authenticationInfo.token,
    };

    return res.json(returnInfo);
  }
}

export { AuthenticateUserController };
