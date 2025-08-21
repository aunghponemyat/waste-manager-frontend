/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */

import React from 'react';
import {
  // Col,
  Container,
  Row,
  Card,
  CardBody,
  // Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import Stepper from 'react-js-stepper';
import { getTrainingSlideDetail } from '../../../../redux/actions/apiActions/trainingSlideActions';
import history from '../../../../shared/utils/history';
// import { Slide } from 'react-slideshow-image';
import '../../../../scss/component/trainingslide.scss';

class TrainingAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 1,
    };
  }
  componentWillMount() {
    this.props.getTrainingSlideDetail(this.props.match.params.trainingSlideId);
  }

  handleOnClickStepper = (step) => {
    this.setState({ activeStep: step });
  }

  handleOnClickNext = () => {
    if (document.getElementById('next').value === 'finish') {
      console.log('finish');
    }
    const nextStep = this.state.activeStep + 1;
    this.setState({ activeStep: nextStep });
  }

  handleOnClickBack = () => {
    const prevStep = this.state.activeStep - 1;
    this.setState({ activeStep: prevStep });
  }

  handleOnClickFinish = () => {
    history.push('/training');
    window.location.reload(true);
  }

  render() {
    const { training_slides } = this.props;
    if (training_slides.detail !== null) {
      console.log(training_slides.detail.Slides.length);
    }
    return (
      <React.Fragment>
        <Container className="dashboard" style={{ overflow: 'hidden' }}>
          <Row>
            <Card>
              {training_slides.detail &&
                <CardBody style={{ alignSelf: 'center' }}>
                  <Stepper
                    steps={training_slides.detail.Slides}
                    activeStep={this.state.activeStep}
                    onSelect={this.handleOnClickStepper}
                    showNumber={false}
                  />
                  <div style={{ marginTop: '40px' }}>
                    <img
                      // src={`../../../../shared/img/Trainingview/${tutorialSteps[this.state.activeStep - 1].label}.png`}
                      src={training_slides.detail.Slides[this.state.activeStep - 1]}
                      alt={training_slides.detail.Slides[this.state.activeStep - 1]}
                      className="training__image"
                    />
                  </div>
                  <div style={{ marginTop: '40px' }}>
                    <input
                      id="next"
                      style={{ float: 'right' }}
                      className="training__button"
                      type="button"
                      value={this.state.activeStep === training_slides.detail.Slides.length ? 'Finish' : 'Next'}
                      onClick={this.state.activeStep === training_slides.detail.Slides.length ? this.handleOnClickFinish : this.handleOnClickNext}
                    />
                    {this.state.activeStep === 1 ? '' : <input
                      className="training__button"
                      style={{ float: 'left' }}
                      type="button"
                      value="Back"
                      onClick={this.handleOnClickBack}
                    /> }
                  </div>
                </CardBody>
              }
            </Card>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTrainingSlideDetail: (trainingSlideId) => {
    dispatch(getTrainingSlideDetail(trainingSlideId));
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

export default connect(mapStateToProps, mapDispatchToProps)(TrainingAPI);
