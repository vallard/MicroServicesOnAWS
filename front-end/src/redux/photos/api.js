import { API, Storage, Logger } from 'aws-amplify';
import { APINAME  } from '../../config';

//Logger.LOG_LEVEL = 'DEBUG'

const api = {
  get() {
    const path = '/photos';
    const myInit = {
    }
    return API.get(APINAME, path, myInit);
  },
  del(userData) { 
    const path = `/photos?id={userData.id}`;
    return API.delete(APINAME, path, null);
  },

  /* Hack because amplify doesn't support multipart file uploads. */
  /* https://github.com/aws-amplify/amplify-js/issues/1437 */
  up(photoData) {
    return Storage.put(photoData.name, photoData, {
      level: 'private',
      contentype: photoData.type
    })
  },
  write(data) {
    const path = '/photos';
    const myInit = {
      body: {
        "name" : data.name,
      }
    }
    return API.post(APINAME, path, myInit);
  }
}

export default api;

