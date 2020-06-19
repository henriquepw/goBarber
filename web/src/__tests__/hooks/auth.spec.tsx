import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import { useAuth, AuthProvider } from '../../hooks/auth';

const apiMock = new MockAdapter(api);

const user = {
  id: 'user-id',
  name: 'john doe',
  email: 'ex@mple.com',
  avatarUrl: 'image-test.png',
};

const token = 'token-123';

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    apiMock.onPost('sessions').reply(200, { user, token });

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const email = 'ex@mple.com';

    result.current.signIn({
      email,
      password: '123123',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', token);
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user.email).toEqual(email);
  });

  it('should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === '@GoBarber:token') return token;
      if (key === '@GoBarber:user') return JSON.stringify(user);

      return null;
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.user.email).toEqual(user.email);
  });

  it('should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === '@GoBarber:token') return token;
      if (key === '@GoBarber:user') return JSON.stringify(user);

      return null;
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(result.current.user).toBeUndefined();
    expect(removeItemSpy).toHaveBeenCalledTimes(2);
  });

  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.updateUser(user);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(user),
    );

    expect(result.current.user).toEqual(user);
  });
});
