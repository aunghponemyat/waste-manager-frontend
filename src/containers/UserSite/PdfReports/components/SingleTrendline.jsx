/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import Header from './Header';
import Footer from './Footer';
import TrendLineChart from './SingleTrendLineChart';
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
    total: 0,
  }

  componentWillMount() {
    const { data } = this.props;
    let { total } = this.state;
    for (const key in data) {
      total += data[key].value;
    }
    this.setState({ total });
  }

  render() {
    const { total } = this.state;
    const {
      data, quarters, totalPages, currentPage, organization, reportDate, waste,
    } = this.props;
    return (
      <div className="generation-page">
        <Header date={reportDate} />
        <div className="generation-content">
          <div className="generation-title">
            <div style={{ width: '70%', float: 'left' }}>
              <h5>Generation and Recycling</h5>
              <h4>Recycling Trend Line</h4>
            </div>
            <div style={{ width: '30%' }}>
              {quarters.length > 1 ?
                <p>Total ({quarters.length}) Quarters</p>
                :
                quarters.map(item => (
                  <p>{item}</p>
                ))
              }
            </div>
          </div>
          <div className="dashboard" style={{ marginTop: 50 }}>
            <h5 style={{ textAlign: 'center' }}>{wastes[waste][0].toUpperCase() + wastes[waste].slice(1)} (kg)</h5>
            <TrendLineChart data={data} color={colors[waste]} />
            <ul style={{ listStyle: 'inside', textAlign: 'center' }}><li>{organization} recycled {total.toFixed(2)} KG of recyclable {wastes[waste]} waste</li></ul>
          </div>
        </div>
        <Footer totalPages={totalPages} currentPage={currentPage} />
      </div>
    );
  }
}

export default Trendline;
