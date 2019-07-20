import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import { updateProfileSuccess, updateProfileFailure } from './actions';

import api from '~/services/api';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = Object.assign(
      { name, email },
      rest.OldPassword ? rest : {}
    );

    const res = yield call(api.put, 'users', profile);

    Alert.alert('Sucesso', 'Perfil atualizado');

    yield put(updateProfileSuccess(res.data));
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização do perfil, verifique seus dados'
    );

    yield put(updateProfileFailure('Erro ao atualizar, verifique seus dados!'));
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
