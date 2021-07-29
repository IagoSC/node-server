import { Response, Request, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string;
}

const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token missing", 401);

  const token = authHeader.split(" ")[1];

  try {
    const { sub: user_id } = verify(
      token,
      "738bedb38982ada51242db73296e7a2d"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.getById(user_id);

    if (!user) throw new AppError("User don't exists", 401);

    req.user = { id: user_id };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
};

export { ensureAuthenticated };
