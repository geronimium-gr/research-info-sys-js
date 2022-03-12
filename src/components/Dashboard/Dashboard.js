import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Navbar, Button, NavDropdown, Nav, Container } from "react-bootstrap";
import { auth, db, logout } from "../../firebase";
import {
  query,
  collection,
  getDocs,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const Dashboard = () => {

  //Use States
  const [user, loading, error] = useAuthState(auth);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  let component;

  //Get User ID
  const getAuthUser = () => {
    const authenticatedUser = getAuth();
    const currentUser = authenticatedUser.currentUser;

    if (currentUser) {
      console.log(currentUser.email);
      getUserData(currentUser.uid);
    } else {
      console.log("Sign Out");
    }
  };

  //Get User's Other Data
  const getUserData = async (currentUser) => {
    const docRef = doc(db, "users", currentUser);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data().firstName);
      setFirstName(docSnap.data().firstName);
      setLastName(docSnap.data().lastName);
      setEmail(docSnap.data().email);
      setRole(docSnap.data().roleName);
    } else {
      console.log("No Such Document");
    }
  };

  //Roles Bases Access
  if (role === "Admin") {
    component = <h1>Hello Admin</h1>;
  } else if (role === "Encoder") {
    component = <h1>Hello Encoder</h1>;
  }

  //Rendering
  useEffect(() => {
    if (loading) return;

    if (!user) return navigate("/");

    getAuthUser();
  }, [user, loading]);

  return (
    <div>
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Logo Here</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">{firstName} {lastName}</a>
          </Navbar.Text>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-success" onClick={logout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {component}
    </div>
  );
};

export default Dashboard;
