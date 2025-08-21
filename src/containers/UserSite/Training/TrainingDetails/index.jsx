/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Card, CardBody, Col, Row, Container,
} from 'reactstrap';
import { connect } from 'react-redux';
import EditTrainingForm from './components/EditTrainingForm';
import { getTrainingDetail, updateTraining } from '../../../../redux/actions/apiActions/trainingActions';

class WasteCollectionScheduleDetail extends React.Component {
  state={
    training: null,
    trainingDetail: {},
  }
  componentWillMount() {
    this.props.getTrainingDetail(this.props.match.params.trainingId);
  }

  componentDidUpdate() {
    if (this.props.trainings.detail && this.props.trainings.detail !== this.state.trainingDetail) {
      const training = {};
      const trainingDetail = this.props.trainings.detail;
      console.log(trainingDetail);
      training.organizationId = trainingDetail.organizationId;
      training.trainingDate = new Date(trainingDetail.trainingDate).toLocaleString();
      training.trainerName = trainingDetail.trainerName;
      training.topic = trainingDetail.topic;
      training.status = trainingDetail.status;
      training.type = trainingDetail.type;
      if (trainingDetail.attendees) {
        training.attendees = [];
        Object.keys(trainingDetail.attendees).forEach((key) => {
          const attendee = {
            name: trainingDetail.attendees[key].name,
            position: trainingDetail.attendees[key].position,
            department: trainingDetail.attendees[key].department,
            feedback: trainingDetail.attendees[key].feedback,
          };
          training.attendees.push(attendee);
        });
      }
      this.setState({ training, trainingDetail });
    }
  }

  handleSubmit = (values) => {
    const data = {};
    console.log(values);
    // Add Edited Vehicle Data
    if (values.status) {
      data.status = values.status.value;
    }
    if (values.type) {
      data.type = values.type.value;
    }
    if (values.trainerName) {
      data.trainerName = values.trainerName;
    }
    if (values.topic) {
      data.topic = values.topic;
    }

    if (values.attendees) {
      data.attendees = [];
      Object.keys(values.attendees).forEach((key) => {
        const attendee = {
          name: values.attendees[key].name,
          position: values.attendees[key].position,
          department: values.attendees[key].department,
          feedback: values.attendees[key].feedback,
        };
        data.attendees.push(attendee);
      });
    }
    this.props.updateTraining(data, this.props.match.params.trainingId);
  }

  render() {
    const { training } = this.state;
    // const { users } = this.props;
    return (
      <Container className="dashboard">
        <Row>
          <Col md={9}>
            <h3 className="page-title">Waste Collection Details</h3>
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <CardBody>
                {training &&
                  <EditTrainingForm
                    initialValues={training}
                    // drivers={users.drivers}
                    // operationTeam={users.operationTeam}
                    trainingDetail={this.state.trainingDetail}
                    onSubmit={this.handleSubmit}
                  />
                }
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTrainingDetail: (trainingId) => {
    dispatch(getTrainingDetail(trainingId));
  },
  updateTraining: (data, trainingId) => {
    dispatch(updateTraining(data, trainingId));
  },
});

const mapStateToProps = state => ({
  trainings: state.trainings,
  users: state.users,
});

export default connect(mapStateToProps, mapDispatchToProps)(WasteCollectionScheduleDetail);
