import React, {useState} from 'react';
import {Storage} from 'aws-amplify';
import Card from 'react-bootstrap/Card';

const S3Image = ({photoName}) => {
  const [imageURL, setImageURL] = useState("")

  Storage.get(photoName, {level: 'private'})
  .then(result => setImageURL(result));

  return (
    <>
      { imageURL === "" ? 
          null
          :
          <>
          {/*<img src={imageURL} className="card-img-top" alt={photoName} /> */}
          <Card.Img variant="top" src={imageURL} alt={photoName} />
          </>
      }
    </>
)};

export default S3Image
