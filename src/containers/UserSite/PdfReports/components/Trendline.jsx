/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import Header from './Header';
import Footer from './Footer';
import TrendLineChart from './TrendLineChart';
import '../../../../scss/report/Generation.scss';

const colors = {
  Papers: '#5886a5',
  Plastics: '#de425b',
  Cans: '#78ab63',
  Glasses: '#FFF314',
  'E-waste': '#FF7F00',
  Organic: '#654321',
};

const wastes = {
  Papers: 'paper',
  Plastics: 'plastic',
  Cans: 'can',
  Glasses: 'glass',
  'E-waste': 'e-waste',
  Organic: 'organic',
};

class Trendline extends PureComponent {
  render() {
    const {
      data, months, totalPages, currentPage, organization, reportDate,
    } = this.props;
    return (
      <div className="generation-page">
        <Header date={reportDate} />
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: '64%', float: 'left' }}>
              <h5>Generation and Recycling</h5>
              <h4>Recycling Trend Line</h4>
            </div>
            <div style={{ width: '36%' }}>
              {months.length > 1 ?
                <p>Total ({months.length}) Months</p>
                :
                months.map(item => (
                  <p>{item}</p>
                ))
              }
            </div>
          </div>
          <div className="dashboard">
            <Row>
              {data && Object.keys(data).map((item, key) => (
                <Col key={key} md={6} lg={6} style={{ marginTop: '10px' }}>
                  <h5 style={{ textAlign: 'center' }}>{wastes[item].charAt(0).toUpperCase() + wastes[item].slice(1)}</h5>
                  <TrendLineChart data={data[item].data} color={colors[item]} />
                  <ul style={{ listStyle: 'inside', textAlign: 'center' }}><li>{organization} recycled {data[item].total.toFixed(2)} KG of recyclable {wastes[item]} waste.</li></ul>
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

export default Trendline;
