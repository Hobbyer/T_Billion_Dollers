import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useOutletContext } from "react-router-dom";

const Header = () => {

  return (
    <Navbar
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80px" }}
    >
      <Container className="d-flex justify-content-center align-items-center">
        <Navbar.Brand href="#home" className="fw-bold fs-2">
            <img
              alt=""
              src="/imgs/animal.png"
              width="50"
              height="50"
              className="d-inline-block align-top me-2"
            />
            FRAMDAS
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
