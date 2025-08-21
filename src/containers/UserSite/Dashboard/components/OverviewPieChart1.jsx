/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Col } from 'reactstrap';

const wastes = {
  Papers: 'Paper',
  Plastics: 'Plastic',
  Cans: 'Can',
  Glasses: 'Glass',
  'E-waste': 'E-waste',
  Organic: 'Organic',
};

const wasteColors = {
  Paper: "#159e32ff",
  Plastic: "#70df70ff",
  Can: "#2a7924ff",
  Glass: "#04d400ff",
  "E-waste": "#1ee976ff",
  Organic: "#4CAF50",
};

class OverviewSemiDonutChart extends PureComponent {
  render() {
    const { data } = this.props;

    const chartData = data.map(item => ({
      x: wastes[item.name],
      y: item.quantity,
    }));

    const labels = chartData.map(item => item.x);
    const values = chartData.map(item => item.y);
    const colors = chartData.map(item => wasteColors[item.x] || '#999');

    const chartOptions = {
      chart: {
        type: 'donut',
      },
      labels,
      colors,
      tooltip: {
        y: {
          formatter: val => `${val} kg`,
        },
      },
      legend: {
        position: 'bottom',
        fontFamily: 'Poppins, sans-serif',
        labels: {
          colors: '#333',
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '60%',
          },
          expandOnClick: true,
        },
      },
      stroke: {
        show: false,
      },
    };

    return (
      <Col xs={12} md={12} lg={12} xl={12}>
        {chartData.length > 0 && (
          <ReactApexChart
            options={chartOptions}
            series={values}
            type="donut"
            height={300}
          />
        )}
      </Col>
    );
  }
}

export default OverviewSemiDonutChart;
