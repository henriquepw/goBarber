import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('ShowUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123123',
    });

    const profile = await showProfile.execute(user.id);

    expect(profile).toEqual(expect.objectContaining(user));
  });

  it('should not be able to show the user profile form non-existing user', async () => {
    await expect(
      showProfile.execute('non-existing-user-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
