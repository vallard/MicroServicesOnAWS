import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import photosSaga from './photos/saga';

export default function* rootSaga(getState: any): any {
  yield all([
    authSaga(),
    photosSaga(),
  ]);
}
