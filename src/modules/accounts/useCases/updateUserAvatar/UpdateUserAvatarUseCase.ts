import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { UsersRepository } from "../../infra/typeorm/repositories/UsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}
  async execute({ userId, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.getById(userId);

    if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);

    user.avatar = avatarFile;

    await this.usersRepository.update(user.id, user.avatar);
  }
}

export { UpdateUserAvatarUseCase };
