import React from 'react';
import { Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import AddOrganizationForm from './components/AddOrganizationForm';
import { addNewOrganization } from '../../../../redux/actions/apiActions/organizationActions';

// eslint-disable-next-line react/prop-types
const BasicForm = ({ dispatch, startDate, location }) => (
  <Container>
    {/* <Row>
      <Col md={12}>
        <h3 className="page-title">Add Organization</h3>
      </Col>
    </Row> */}
    <Row>
      <AddOrganizationForm onSubmit={values => dispatch(addNewOrganization(values, startDate, location))} />
    </Row>
  </Container>
);


const mapStateToProps = state => ({
  startDate: state.organizations.startDate,
  location: state.organizations.location,
});

export default connect(mapStateToProps)(BasicForm);
