//import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Navbar from '../Navbar/Navbar';

const LandingLayout = ({ children, user, handleSignout }) => (
  <Container fluid>
    <Row>
      <Col md={3} className="vh-100 p-0 bg-light">
        <Navbar user={user} handleSignout={handleSignout} />
      </Col>
      <Col md={9} className="vh-100 p-3">
        {children}
      </Col>
    </Row>
  </Container>
);

export default LandingLayout;
