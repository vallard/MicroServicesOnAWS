import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Home = ({photos, uploadFunc, delFunc}) => (
    <div className="container">
        <p className="lead">
          Welcome to your photo album!
        </p>
        <div className="row">
          {photos && photos.map( (photo, i) => (
            <div className="card card-photo col-sm-3" key={i + "-" + photo.id}>
              { photo.url == null ? 
                  <br/>
                  :
                  <img src={photo.url} className="card-img-top" alt={i + "-" + photo.name} />
              }
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
);

export default Home
