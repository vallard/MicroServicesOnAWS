import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';

const SignInForm = ({action, loading, sub}) =>  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submit = (e) => {
    e.preventDefault();
    action(email, password);
  }
  return (
      <Form onSubmit={submit} >
        <Form.Group>
          <Form.Control disabled={loading} type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
          <Form.Text className="text-muted">We'll never share your email.</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Control disabled={loading} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ?
            <Spinner animation="grow" size="lg"/>
            :
            <>{sub}</>
          }
        </Button>
      </Form>
  )
};
export default SignInForm;
