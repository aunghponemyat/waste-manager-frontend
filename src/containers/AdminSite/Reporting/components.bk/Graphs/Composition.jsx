/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import PieChart from './PieChart';
import '../../../../../scss/report/Generation.scss';

const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

class Composition extends Component {
  state = {
    fixedData: null,
  }

  componentWillMount() {
    const { data } = this.props;
    const pickUpDates = {};
    const fixedData = [];
    for (let i = 0; i < data.length; i += 1) {
      const date = new Date(data[i].pickUpTime);
      const pickUpDate = `1-${months[date.getMonth()]}-${date.getFullYear()}`;
      if (!Object.keys(pickUpDates).includes(pickUpDate)) {
        pickUpDates[pickUpDate] = Object.keys(pickUpDates).length;
        fixedData.push({
          pickUpTime: pickUpDate,
          items: data[i].items,
        });
      } else {
        const items = [];
        items.push(...fixedData[pickUpDates[pickUpDate]].items, ...data[i].items);
        fixedData[pickUpDates[pickUpDate]].items = items;
      }
    }
    this.setState({
      fixedData,
    });
  }

  render() {
    const { title } = this.props;
    const { fixedData } = this.state;
    return (
      <div>
        <div className="generation-content">
          <Container className="dashboard">
            <h5>{title}</h5>
            <Row>
              {/* {data && data.map((item, key) => (
                <Col key={key} md={6} lg={6} style={{ paddingTop: '20px' }}>
                  <h5 style={{ textAlign: 'center' }}>Waste Composition (%)</h5>
                  <h5 style={{ textAlign: 'center' }}>{months[new Date(item.pickUpTime).getMonth()]}</h5>
                  <PieChart data={item.items} />
                </Col>
              ))} */}
              {fixedData && fixedData.map((item, key) => (
                <Col key={key} md={6} lg={6} style={{ paddingTop: '20px' }}>
                  <h5 style={{ textAlign: 'center' }}>Waste Composition (%)</h5>
                  <h5 style={{ textAlign: 'center' }}>{months[new Date(item.pickUpTime).getMonth()]}</h5>
                  <PieChart data={item.items} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Composition;
