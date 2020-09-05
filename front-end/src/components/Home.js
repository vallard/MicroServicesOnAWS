import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import S3Image from './S3Image';

const Home = ({photos, uploadFunc, delFunc, loading}) => {
  return (
    <div className="container">
        {loading && 
          <div className="text-center">
            <Spinner animation="grow" variant="primary"/>
          </div>
        }
        <br/>
        <div className="row">
          {photos && photos.photos && photos.photos.map( (photo, i) => (
            <div className="card card-photo col-sm-3" key={i + "-" + photo.id}>
              <S3Image photoName={photo.name} />
              <div className="card-body">
                { photo.objects == null ? 
                    <br/>
                    :
                    <div>
                      Detected Objects
                    { photo.objects.map( (obj, j) => (
                      <div className="card-text" key={i+ "-" + j}>{obj.item} <small>{parseFloat(obj.score * 100).toFixed(2)}%</small></div>
                    ))}
                    </div>
                }
                <Button variant="primary" id={i} onClick={delFunc}>Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Form>
          <Form.Group>
            <Form.File id="file-upload" onChange={uploadFunc} label="Upload a Photo"/>
          </Form.Group>
        </Form>
    </div>
)};

export default Home
