import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import AddUserForm from './components/AddUserForm';
import { addNewUser } from '../../../../redux/actions/apiActions/userActions';

// eslint-disable-next-line react/prop-types
const BasicForm = ({ dispatch }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Add User</h3>
      </Col>
    </Row>
    <Row>
      <AddUserForm onSubmit={values => dispatch(addNewUser(values))} />
    </Row>
  </Container>
);

export default connect()(BasicForm);
