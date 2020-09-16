import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
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
            <Card className="col-sm-3" key={i + "-" + photo.id} >
              <S3Image photoName={photo.name} />
              <Card.Body>
                { photo.objects == null ? 
                    <br/>
                    :
                    <div>
                      Detected Objects
                    { photo.objects.map( (obj, j) => (
                      <div className="card-text" key={i+ "-" + j}>{obj.item} <small>{parseFloat(obj.score).toFixed(2)}%</small></div>
                    ))}
                    </div>
                }
                <div className="text-right">
                  <Button variant="primary" id={photo.id} onClick={delFunc}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
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
