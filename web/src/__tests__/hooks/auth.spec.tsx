import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import api from '../../services/api';
import { useAuth, AuthProvider } from '../../hooks/auth';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('should be able to sign in', async () => {
    const user = {
      id: 'user-id',
      name: 'john doe',
      email: 'ex@mple.com',
    };

    const token = 'token-123';

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
});
