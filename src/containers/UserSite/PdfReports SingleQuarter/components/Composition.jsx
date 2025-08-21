/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';
import PieChart from './PieChart';
import '../../../../scss/report/Generation.scss';

class Composition extends Component {
  render() {
    const {
      title, totalPages, currentPage, reportDate, data,
    } = this.props;
    return (
      <div className="generation-page">
        <Header date={reportDate} />
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: '70%', float: 'left' }}>
              <h5>Generation and Recycling</h5>
              <h4>Monthly Waste Collection</h4>
            </div>
            <div style={{ width: '30%' }}>
              <p>{title}</p>
            </div>
          </div>
          <Container className="dashboard">
            <Row>
              {data && Object.keys(data).map((item, key) => (
                <Col key={key} md={6} lg={6} style={{ paddingTop: '20px' }}>
                  <h5 style={{ textAlign: 'center' }}>Waste Composition (%)</h5>
                  <h5 style={{ textAlign: 'center' }}>{item}</h5>
                  <PieChart data={data[item].chartData} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        <Footer totalPages={totalPages} currentPage={currentPage} />
      </div>
    );
  }
}

export default Composition;
