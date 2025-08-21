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

class OverviewColumnChart extends PureComponent {
  render() {
    const { data } = this.props;

    // Define chartData here based on the provided data
    const chartData = data.map(item => ({
      x: wastes[item.name],
      y: item.quantity,
    }));

    const chartOptions = {
      chart: {
        type: 'bar',
        height: 350, // Adjust the height as needed
      },
      xaxis: {
        categories: chartData.map(item => item.x),
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            position: 'top', // Show data labels at the top of the bars
          },
        },
      },
      dataLabels: {
        enabled: true,
        offsetY: -20, // Adjust the offset as needed to position the labels
      },
      // Customize other options as needed
    };

    return (
      <Col xs={12} md={12} lg={12} xl={12}>
        {chartData.length > 0 && (
          <ReactApexChart
            options={chartOptions}
            series={[
              {
                data: chartData.map(item => item.y),
              },
            ]}
            type="bar"
            height={chartOptions.height}
          />
        )}
      </Col>
    );
  }
}

export default OverviewColumnChart;
