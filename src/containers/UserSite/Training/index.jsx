import React from 'react';
import {
  Col,
  Container,
  Row,
  // Button,
} from 'reactstrap';
// import { FaPlus } from 'react-icons/fa';
// import TrainingTable from './components/TrainingTable';
// eslint-disable-next-line import/no-unresolved, import/extensions
import TrainingCourse from './components/TrainingCourse_bk';
// import history from '../../../shared/utils/history';

const Training = () => (
  <Container className="dashboard" style={{ overflow: 'hidden' }}>
    <Row>
      <Col md={9}>
        <h3 className="page-title">Training</h3>
      </Col>
      {/* <Col md={3}>
        <Button
          className="icon"
          color="success"
          style={{ float: 'right' }}
          // eslint-disable-next-line react/prop-types
          onClick={() => {
            history.push('/training/quizzes');
            window.location.reload(true);
          }}
        >
          <p>
            Test your knowledge
          </p>
        </Button>
      </Col> */}
    </Row>
    <Row>
      <TrainingCourse />
    </Row>
  </Container>
);

export default Training;
