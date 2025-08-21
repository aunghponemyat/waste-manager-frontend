/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */

import React, { PureComponent } from 'react';
// import {
//   Col,
// } from 'reactstrap';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
// import { reduxForm } from 'redux-form';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { getTrainingSlideList } from '../../../../redux/actions/apiActions/trainingSlideActions';
// import { addNewUserAnsQuiz } from '../../../../../../redux/actions/apiActions/userAnsQuizActions';
// import renderRadioButtonField from '../../../../../../shared/components/form/RadioButton';
// import history from '../../../../shared/utils/history';
import TrainingCourseAPI from './TrainingCourse';

class Plastic extends PureComponent {
  state= {
    pp: null,
  }
  componentWillMount() {
    this.props.getTrainingSlideList();
  }
  render() {
    const { training_slides } = this.props;
    const {
      pp,
    } = this.state;
    return (
      // <Container style={{ overflow: 'hidden' }}>
      //   <TrainingCourseAPI
      //     initialValues={pp}
      //     training_slides={training_slides}
      //     // onSubmit={values => addNewUserAnsQuiz(values)}
      //   />
      // </Container>
      <Container className="dashboard" style={{ overflow: "hidden" }}>
        <div className="training-bg">
          <Row>
            <Col md={9}>
              <h3
                style={{
                  fontSize: '1.8rem',
                  fontWeight: 600,
                  color: 'black',
                  marginTop: '20px',
                }}
              >Training</h3>
              <p
                style={{
                  fontSize: '14px',
                  color: '#24a444ff',
                }}
              >
                These training lessons cover waste management topics, including
                Paper Waste, Plastic Waste, and E-waste Segregation.
              </p>
            </Col>
          </Row>
          <Row>
            <TrainingCourseAPI
              initialValues={pp}
              training_slides={training_slides}
              // onSubmit={values => addNewUserAnsQuiz(values)}
            />
          </Row>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTrainingSlideList: () => {
    dispatch(getTrainingSlideList());
  },
  // addNewUserAnsQuiz: (addNewUserAnsId) => {
  //   dispatch(addNewUserAnsQuiz(addNewUserAnsId));
  // }
  // deleteOrganization: (organizationId) => {
  //   dispatch(deleteOrganization(organizationId));
  // },
});

const mapStateToProps = state => ({
  training_slides: state.training_slides,
});

export default connect(mapStateToProps, mapDispatchToProps)(Plastic);
