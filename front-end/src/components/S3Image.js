import React, {useState} from 'react';
import {Storage} from 'aws-amplify';

const S3Image = ({photoName}) => {
  const [imageURL, setImageURL] = useState("")

  Storage.get(photoName, {level: 'private'})
  .then(result => setImageURL(result));

  return (
    <>
      { imageURL === "" ? 
          null
          :
          <img src={imageURL} className="card-img-top" alt={photoName} />
      }
    </>
)};

export default S3Image
