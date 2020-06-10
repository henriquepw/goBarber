import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { classToClass } from 'class-transformer';

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(exceptUserId: string): Promise<User[]> {
    const cacheKey = `providers-list:${exceptUserId}`;

    let users = await this.cacheProvider.recover<User[]>(cacheKey);

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        exceptUserId,
      });

      await this.cacheProvider.save(cacheKey, classToClass(users));
    }

    return users;
  }
}
export default ListProvidersService;
