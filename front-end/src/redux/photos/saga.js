import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import photoAPI from './api';
import {
  GET_PHOTOS,
  DEL_PHOTO,
  UP_PHOTO,
} from './constants';

import {
  gotError,
  gotPhotos,
} from './actions';

export function* get_photos() {
  /* get the photos */
  let response = yield call(photoAPI.get)
  if (response instanceof Error) {
    return yield put(gotError(response))
  }
  console.log(response)
  return yield put(gotPhotos(response.photos))
} 

export function* up_photo(action) {
  /* upload the photo */
  let response = yield call(photoAPI.up, action.data) 
  if (response instanceof Error) {
    return yield put(gotError(response))
  }
  console.log(response)
  return yield put(gotPhotos(response.photos))
}

export function* del_photo(action) {
  /* delete the photo */
  let response = yield call(photoAPI.del, { id : action.id })
  if (response instanceof Error) {
    return yield put(gotError(response))
  }
  console.log(response)
  return yield put(gotPhotos(response.photos))
}
  


export function* watchPhotos(){
  yield takeEvery(GET_PHOTOS, get_photos)
  yield takeEvery(DEL_PHOTO, del_photo)
  yield takeEvery(UP_PHOTO, up_photo)
}

function* photosSaga(): any{
  yield all([
    fork(watchPhotos),
  ]);
}

export default photosSaga;
