/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import {
  Card, CardBody, Col,
} from 'reactstrap';
import { connect } from 'react-redux';
// import { reduxForm } from 'redux-form';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { getQuizDetail } from '../../../../../redux/actions/apiActions/quizActions';
// import { addNewUserAnsQuiz } from '../../../../../../redux/actions/apiActions/userAnsQuizActions';
// import renderRadioButtonField from '../../../../../../shared/components/form/RadioButton';
import history from '../../../../../shared/utils/history';
import PlasticTestAPI from './QuizAPI';

class Plastic extends PureComponent {
  state= {
    pp: null,
  }
  componentWillMount() {
    this.props.getQuizDetail(this.props.match.params.quizId);
  }
  redirectToTrainingPage = () => {
    history.push('/training');
    window.location.reload(true);
  }
  render() {
    const { quizzes } = this.props;
    const {
      pp,
    } = this.state;
    return (
      <Col md={12} lg={12}>
        <Card className="quiz-card">
          <CardBody>
            <PlasticTestAPI
              initialValues={pp}
              quizzes={quizzes}
              // onSubmit={values => addNewUserAnsQuiz(values)}
            />
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getQuizDetail: (quizId) => {
    dispatch(getQuizDetail(quizId));
  },
  // addNewUserAnsQuiz: (addNewUserAnsId) => {
  //   dispatch(addNewUserAnsQuiz(addNewUserAnsId));
  // }
  // deleteOrganization: (organizationId) => {
  //   dispatch(deleteOrganization(organizationId));
  // },
});

const mapStateToProps = state => ({
  quizzes: state.quizzes,
});

export default connect(mapStateToProps, mapDispatchToProps)(Plastic);

