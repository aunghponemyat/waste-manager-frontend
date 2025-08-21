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
  state = {
    total: {},
  }

  componentWillMount() {
    const { data } = this.props;
    const { total } = this.state;
    for (const keys in data) {
      total[keys] = 0;
      for (let i = 0; i < data[keys].length; i += 1) {
        total[keys] += data[keys][i].value;
      }
    }
    this.setState({ total });
  }

  render() {
    const { total } = this.state;
    const {
      data, quarters, totalPages, currentPage, organization, reportDate,
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
            <div style={{ width: '36%', alignItems: 'center', display: 'flex', justifyContent: 'flex-end', textAlign: 'right' }}>
              {quarters.length > 1 ?
                <p style={{ whiteSpace: 'nowrap', margin: 0 }}>Total ({quarters.length}) Quarters</p>
                :
                quarters.map(item => (
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
                  <TrendLineChart data={data[item]} color={colors[item]} />
                  <ul style={{ listStyle: 'inside', textAlign: 'center' }}><li>{organization} recycled {total[item].toFixed(2)} KG of recyclable {wastes[item]} waste</li></ul>
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
