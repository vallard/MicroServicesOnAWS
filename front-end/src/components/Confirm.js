import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

const Confirm = ({action, loading}) =>  {
  const [code, setCode] = useState('');
  const submit = (e) => {
    console.log("did submit.");
    console.log("code: ", code);
    e.preventDefault();
    console.log(action);
    action( code );
  }
  return (
      <Form onSubmit={submit} >
        <Form.Group>
          <Form.Control disabled={loading} type="text" placeholder="000000" onChange={(e) => setCode(e.target.value)}/>
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ?
            <Spinner size="sm" animation="grow"/>
            :
            <>Confirm</>
          }
        </Button>
      </Form>
  )
};
export default Confirm;
