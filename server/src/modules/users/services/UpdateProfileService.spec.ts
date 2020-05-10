import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;

let updateProfile: UpdateProfileService;

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able to update the user profile form non-existing user', async () => {
    await expect(
      updateProfile.execute({
        userId: 'non-existing-user-id',
        name: 'test',
        email: 'test@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change email if already in use', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123123',
    });

    const user = await fakeUsersRepository.create({
      name: 'Test',
      email: 'test@example.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Doe',
        email: 'john@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123123',
    });

    const updatedUser = await updateProfile.execute({
      userId: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
      oldPassword: '123123',
      password: '123456',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123123',
    });

    await expect(
      updateProfile.execute({
        userId: user.id,
        name: 'John Trê',
        email: 'johntre@example.com',
        oldPassword: 'wrong-old-password',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
