/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Col } from 'reactstrap';

// Label mapping
const wastes = {
  Papers: 'Paper',
  Plastics: 'Plastic',
  Cans: 'Can',
  Glasses: 'Glass',
  'E-waste': 'E-waste',
  Organic: 'Organic',
};

// Color mapping
const wasteColors = {
  Paper: '#16e016ff',
  Plastic: '#33c221ff',
  Can: '#28ab58ff',
  Glass: '#136622ff',
  'E-waste': '#55c070ff',
  Organic: '#4CAF50',
};

class OverviewBasicBarChart extends PureComponent {
  render() {
    const { data } = this.props;

    const chartData = data.map(item => ({
      x: wastes[item.name],
      y: item.quantity,
    }));

    const categories = chartData.map(item => item.x);
    const values = chartData.map(item => item.y);
    const colors = chartData.map(item => wasteColors[item.x] || '#999');

    const chartOptions = {
      chart: {
        type: 'bar',
        height: 320,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 1,
          distributed: true, // enable per-bar color
        },
      },
      colors,
      dataLabels: {
        enabled: true,
        style: {
          colors: ['white'],
          fontFamily: 'Poppins, sans-serif',
        },
        formatter: val => `${val}`,
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: val => `${val}`,
        },
      },
      xaxis: {
        categories,
        labels: {
          style: {
            fontFamily: 'Poppins, sans-serif',
            colors: '#333',
          },
        },
        title: {
          text: 'Waste Quantity (kg)',
          style: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            fontFamily: 'Poppins, sans-serif',
            colors: '#333',
          },
        },
      },
    };

    return (
      <Col xs={12} md={12} lg={12} xl={12}>
        {chartData.length > 0 && (
          <ReactApexChart
            options={chartOptions}
            series={[{ data: values }]}
            type="bar"
            height={chartOptions.chart.height}
          />
        )}
      </Col>
    );
  }
}

export default OverviewBasicBarChart;
