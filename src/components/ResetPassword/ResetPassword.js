import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const ResetPassword = () => {
    return (
        <Card>
        <Card.Header as="h5">Reset Password</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
  
            <Button variant="primary" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer><Link to="/">Back to Login</Link></Card.Footer>
      </Card>
    );
}

export default ResetPassword;