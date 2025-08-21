/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux';
import AddScheduleForm from './components/AddScheduleForm';
import { addNewLogistics } from '../../../../../redux/actions/apiActions/logisticsActions';

const BasicForm = ({ dispatch, pickUpTime }) => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Add Waste Collection Schedule</h3>
        {/* <h3 className="page-subhead subhead">Use this elements, if you want to show some hints or additional
              information
        </h3> */}
      </Col>
    </Row>
    <Row>
      <AddScheduleForm onSubmit={values => dispatch(addNewLogistics(values, pickUpTime))} />
    </Row>
  </Container>
);

const mapStateToProps = state => ({
  pickUpTime: state.logistics.pickUpTime,
});

export default connect(mapStateToProps)(BasicForm);
