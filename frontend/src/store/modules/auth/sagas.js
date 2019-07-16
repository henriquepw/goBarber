import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

/**
 * payload = { email, passoword}
 */
export function* signIn({ payload }) {
  try {
    const res = yield call(api.post, 'session', payload);

    const { token, user } = res.data;

    if (!user.provider) {
      toast.error('User is not provider');
      return;
    }

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Authentication failed, check your data');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    yield call(api.post, 'users', {
      ...payload,
      provider: true,
    });

    history.push('/');
  } catch (err) {
    toast.error('Register failed, check your data');
    yield put(signFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
