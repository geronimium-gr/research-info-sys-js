import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { Form, Button, Card, Container } from "react-bootstrap";

function Login() {

  //Use States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  //Rendering
  useEffect(() => {
    if (loading) {
      //loading here
      return;
    }

    if (user) navigate("/dashboard");
  }, [user, loading, navigate]);

  //Login method
  const loginHandler = async (event) =>{
    event.preventDefault();
    try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
  }

  return (
    <Container
    className="d-flex align-items-center justify-content-center"
    style={{minHeight: "100vh"}}>
    <div style={{minWidth: "400px"}}>
      
    <Card>
      <Card.Header as="h5">Login</Card.Header>
      <Card.Body>
        <Form onSubmit={loginHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter email" 
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Password" 
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer><Link to="/reset">Forgot Password</Link></Card.Footer>
    </Card>
    </div>
  </Container>
  );
}

export default Login;
