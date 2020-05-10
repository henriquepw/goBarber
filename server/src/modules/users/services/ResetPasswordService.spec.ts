import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;

let resetPassword: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123123',
    });

    const { token } = await fakeUserTokensRepository.generate(id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const updatedUser = await fakeUsersRepository.findById(id);

    await resetPassword.execute({
      newPassword: '123456',
      token,
    });

    expect(generateHash).toHaveBeenCalledWith('123456');

    expect(updatedUser?.password).toBe('123456');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        newPassword: '123456',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'non-existing-user',
    );

    await expect(
      resetPassword.execute({
        newPassword: '123456',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than 2 hours', async () => {
    const { id } = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123123',
    });

    const { token } = await fakeUserTokensRepository.generate(id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customData = new Date();

      return customData.setHours(customData.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        newPassword: '123456',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
