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
const DEBUG = false;

export function* get_photos() {
  /* get the photos */
  try {
    let response = yield call(photoAPI.get)
    DEBUG && console.log("response: ", response);
    return yield put(gotPhotos(response))
  } catch(error) {
    DEBUG && console.log("error: ", error);
    if(! error.response) {
      return yield put(gotError("Photo Loading Issue: " + error.toString()));
    }
    if(error.response.status >= 500 && error.response.status < 600) {
      return yield put(gotError("Internal server error. Status code: " + error.response.status));
    }else if (error.response.status >= 400 && error.response.status < 500) {
      if(error.response.data.message) {
        return yield put(gotError(error.response.data.message));
      }
      return yield put(gotError(error.response.data.error));
    }
    return yield put(gotError("Undefined error: " + error.response.status))

  }
} 

export function* up_photo(action) {
  /* upload the photo */
  DEBUG && console.log("Data upload: ", action.data);
  try {
    // upload to S3
    var response = yield call(photoAPI.up, action.data) 
    // if result is successful, write in database.
    response = yield call(photoAPI.write, action.data); 
    DEBUG && console.log(response)
    return yield put(gotPhotos(response))
  } catch(error) {
    return yield put(gotError(error))
  }
}

export function* del_photo(action) {
  /* delete the photo */
  try {
    let response = yield call(photoAPI.del, { id : action.id })
    return yield put(gotPhotos(response))
  }catch(error) {
    return yield put(gotError(error))
  }
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
