/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import { Row, Col } from 'reactstrap';
import TrendLineChart from './TrendLineChart';

const colors = {
  Papers: '#5886a5',
  Plastics: '#de425b',
  Cans: '#78ab63',
  Glasses: '#FFF314',
  'E-waste': '#FF7F00',
  Organic: '#654321',
};

class TrendLineGraph extends PureComponent {
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
      data, organization,
    } = this.props;
    return (
      <div>
        <div className="generation-content">
          <div className="dashboard">
            <Row>
              {data && Object.keys(data).map((item, key) => (
                <Col key={key} md={6} lg={6} style={{ marginTop: '10px' }}>
                  {/* <h5 style={{ textAlign: 'center' }}>Recycling Trend Line</h5> */}
                  <h5 style={{ textAlign: 'center' }}>{item} (kg)</h5>
                  <TrendLineChart data={data[item]} color={colors[item]} />
                  <ul style={{ marginLeft: '50px' }}><li>{organization} recycled {total[item].toFixed(2)} KG of recyclable waste for {item}.</li></ul>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default TrendLineGraph;
