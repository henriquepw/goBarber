import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(exceptUserId: string): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      exceptUserId,
    });

    return users;
  }
}
export default ListProvidersService;
