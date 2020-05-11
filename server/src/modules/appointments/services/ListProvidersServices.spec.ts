import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListProvidersServices from './ListProvidersServices';

let fakeUsersRepository: FakeUsersRepository;

let listProviders: ListProvidersServices;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersServices(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john.1@example.com',
      password: '123123',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'john.3@example.com',
      password: '123123',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'john.4@example.com',
      password: '123123',
    });

    const providers = await listProviders.execute(loggedUser.id);

    expect(providers).toEqual([user1, user2]);
  });
});
