import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import OrganizationsTable from './components/OrganizationsTable';

const Organizations = props => (
  <Container className="dashboard">
    <Row>
      <Col md={9}>
        <h3 className="page-title">Organizations</h3>
      </Col>
      <Col md={12}>
        <Button
          // className="icon"
          // color="success"
          style={{ float: 'right', color: '#008767', background: 'rgba(33, 213, 27, 0.44)' }}
          // eslint-disable-next-line react/prop-types
          onClick={() => props.history.push('/organizations/add')}
        >
          <FaPlus style={{ fill: "#008767" }} /> Add Organization
        </Button>
      </Col>
    </Row>
    <Row>
      <OrganizationsTable />
    </Row>
  </Container>
);

export default Organizations;
