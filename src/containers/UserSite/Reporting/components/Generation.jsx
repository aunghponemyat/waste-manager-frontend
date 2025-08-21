/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import BarChart from './Graphs/BarChart';
import '../../../../scss/reporting/Generation.scss';
// import kids from '../../../../shared/img/background/kids.png';

// const months = ['January', 'February', 'March', 'April', 'May', 'June',
//   'July', 'August', 'September', 'October', 'November', 'December',
// ];

class Generation extends Component {
  render() {
    const {
      data,
      title,
      organization,
    } = this.props;
    return (
      <div className="reporting-page">
        {/* <img className="kids" alt="about" src={kids} /> */}
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: '70%', float: 'left' }}>
              {/* <h5>Generation and Recycling</h5> */}
              <h4>Monthly Waste Collection
                {/* (
                {data && Object.keys(data).map((item, i) => (
                  // <span>{months[new Date(item.pickUpTime).getMonth()]}{i !== data.length - 1 && ', '}</span>
                  <span>{item}{i !== Object.keys(data).length - 1 && ', '}</span>
                ))}
                ) */}
              </h4>
              <h5>The Monthly Waste Collection report provides a comprehensive overview of the amount of waste generated within each month of the selected quarter</h5>
              <Container className="dashboard">
                <Row>
                  {data && Object.keys(data).map((item, key) => (
                    <Col key={key} md={6} lg={6} style={{ paddingTop: '20px' }}>
                      <ul style={{ listStyle: 'inside', textAlign: 'center' }}><li className="list-text"><h2 className="weight">{data[item].total.toFixed(2)} <span className="kg"> KG </span></h2> of recyclable waste was recycled by {organization} in {item}.</li></ul>
                    </Col>
                  ))}
                </Row>
              </Container>
            </div>
            <div style={{ width: '36%' }}>
              <h2>Summary</h2>
              <p>{title}</p>
            </div>
          </div>
          <Container className="dashboard">
            <Row>
              {data && Object.keys(data).map((item, key) => (
                <Col key={key} md={6} lg={6} style={{ paddingTop: '20px' }}>
                  <p style={{ textAlign: 'center', marginLeft: 30 }}>Pick Up ({item})</p>
                  <BarChart data={data[item].chartData} />
                  <ul style={{ listStyle: 'inside', textAlign: 'left', marginLeft: 45 }}><li style={{ width: '430px' }}>{organization} recycled {data[item].total.toFixed(2)} KG of recyclable waste in {item}.</li></ul>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default Generation;
