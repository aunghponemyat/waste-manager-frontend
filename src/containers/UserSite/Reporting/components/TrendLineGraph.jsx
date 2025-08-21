/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import TrendLineChart from './Graphs/TrendLineChart';
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
    // const { total } = this.state;
    const {
      data, months, organization,
    } = this.props;
    return (
      <div className="reporting-page">
        <div className="generation-content">
          <div className="trend-title">
            <div style={{ width: '100%' }}>
              <h4>Recycling Trend Line</h4>
            </div>
            <div style={{ width: '100%' }}>
              <p>The Recycling Trend Line allows for a clear observation of how the recycling rates for specific materials have evolved over the selected quarter. </p>
            </div>
          </div>
          <div className="dashboard">
            <div className="data">
              <h3>Summary</h3>
              {months.length > 1 ?
                <p>Total ({months.length}) Months</p>
                :
                months.map(item => (
                  <p>{item}</p>
                ))
              }
              <Row>
                {data && Object.keys(data).map((item, key) => (
                  <Col key={key} md={6} lg={2} style={{ paddingTop: '20px' }}>
                    <ul style={{ listStyle: 'inside', textAlign: 'center' }}><li className="list-text"><h2 className="weight">{data[item].total.toFixed(2)} <span className="kg"> KG </span></h2> of {item} waste was recycled by {organization}.</li></ul>
                  </Col>
                ))}
                {data && Object.keys(data).map((item, key) => (
                  <Col key={key} md={6} lg={6} style={{ marginTop: '10px' }}>
                    <h5 style={{ textAlign: 'center' }}>{wastes[item].charAt(0).toUpperCase() + wastes[item].slice(1)}</h5>
                    <TrendLineChart data={data[item].data} color={colors[item]} />
                    <ul style={{ listStyle: 'inside', textAlign: 'center' }}><li>{organization} recycled {data[item].total.toFixed(2)} KG of recyclable {wastes[item]} waste</li></ul>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Trendline;
