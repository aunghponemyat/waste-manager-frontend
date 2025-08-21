import React from 'react';
import { Col, Container, Row, Button } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import UsersTable from './components/UsersTable';

const Users = props => (
  <Container className="dashboard">
    <Row>
      <Col md={9}>
        <h3 className="page-title">Users</h3>
      </Col>
      <Col md={3}>
        <Button
          className="icon"
          color="success"
          style={{ float: 'right' }}
          // eslint-disable-next-line react/prop-types
          onClick={() => props.history.push('/users/add')}
        >
          <p>
            <FaPlus /> Add User
          </p>
        </Button>
      </Col>
    </Row>
    <Row>
      <UsersTable />
    </Row>
  </Container>
);


export default Users;
