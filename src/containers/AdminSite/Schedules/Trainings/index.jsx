// import React from 'react';
// import { Col, Container, Row, Button } from 'reactstrap';
// import { FaPlus } from 'react-icons/fa';
// import TrainingsTable from './components/TrainingsTable';

// const Trainings = props => (
//   <Container className="dashboard">
//     <Row>
//       <Col md={9}>
//         <h3 className="page-title">Trainings</h3>
//       </Col>
//       <Col md={3}>
//         <Button
//           className="icon"
//           color="success"
//           style={{ float: 'right' }}
//           // eslint-disable-next-line react/prop-types
//           onClick={() => props.history.push('/schedules/trainings/add')}
//         >
//           <p>
//             <FaPlus /> Add Schedule
//           </p>
//         </Button>
//       </Col>
//     </Row>
//     <Row>
//       <TrainingsTable />
//     </Row>
//   </Container>
// );

// export default Trainings;

/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Container, Row, Card, CardBody } from 'reactstrap';
// import WasteCollectionTable from './components/WasteCollectionTable';
// import TrainingCalendar from './components/TrainingCalendar';
import TrainingsTable from './components/TrainingsTable';

const Trainings = () => (
  <Container className="dashboard">
    <Row>
      <Col md={9}>
        <h3 className="page-title">Training Schedules</h3>
      </Col>
    </Row>
    <Row>
      {/* <WasteCollectionTable /> */}
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <TrainingsTable />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Trainings;
