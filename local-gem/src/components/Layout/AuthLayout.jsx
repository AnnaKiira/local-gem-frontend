import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AuthLayout = ({ children }) => (
  <Container fluid>
    <Row>
       <Col xs={9} className="p-3">
        {children}
      </Col>
    </Row>
  </Container>
);

export default AuthLayout;
