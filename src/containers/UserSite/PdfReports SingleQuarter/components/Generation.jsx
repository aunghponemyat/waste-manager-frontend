/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';
import BarChart from './BarChart';
import '../../../../scss/report/Generation.scss';

class Generation extends Component {
  render() {
    const {
      title, totalPages, currentPage, organization, date, data,
    } = this.props;
    return (
      <div className="generation-page">
        <Header date={date} />
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: '70%', float: 'left' }}>
              <h5>Generation and Recycling</h5>
              <h4>Monthly Waste Collection (
                {data && Object.keys(data).map((item, i) => (
                  // <span>{months[new Date(item.pickUpTime).getMonth()]}{i !== data.length - 1 && ', '}</span>
                  <span>{item}{i !== Object.keys(data).length - 1 && ', '}</span>
                ))}
                )
              </h4>
            </div>
            <div style={{ width: '30%' }}>
              <p>{title}</p>
            </div>
          </div>
          <div className="dashboard">
            <Row>
              {data && Object.keys(data).map((item, key) => (
                <Col key={key} md={6} lg={6} style={{ paddingTop: '20px' }}>
                  <p style={{ textAlign: 'center', marginLeft: 0 }}>Pick Up ({item})</p>
                  <BarChart data={data[item].chartData} />
                  <ul style={{ listStyle: 'inside', textAlign: 'left', marginLeft: 45 }}><li style={{ width: '500px' }}>{organization} recycled {data[item].total.toFixed(2)} KG of recyclable waste in {item}.</li></ul>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <Footer totalPages={totalPages} currentPage={currentPage} />
      </div>
    );
  }
}

export default Generation;
