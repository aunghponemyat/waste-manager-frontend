/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent } from "react";
import ReactApexChart from "react-apexcharts";
import { Col } from "reactstrap";

// Waste label mappings
const wastes = {
  Papers: "Paper",
  Plastics: "Plastic",
  Cans: "Can",
  Glasses: "Glass",
  "E-waste": "E-waste",
  Organic: "Organic",
};

// Custom colors for each waste type
const wasteColors = {
  Paper: "#4caf50",
  Plastic: "#ff9800",
  Can: "#2196f3",
  Glass: "#9c27b0",
  "E-waste": "#f44336",
  Organic: "#ffc107",
};

class OverviewRadialBarChart extends PureComponent {
  render() {
    const { data } = this.props;

    const chartData = data.map(item => ({
      x: wastes[item.name],
      y: item.quantity,
    }));

    const chartOptions = {
      chart: {
        type: "radialBar",
        height: 350,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          hollow: {
            size: "70%",
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "16px",
            },
            value: {
              show: true,
              offsetY: 0,
              fontSize: "20px",
            },
          },
        },
      },
      labels: chartData.map(item => item.x),
      // ✅ Add custom colors here
      colors: chartData.map(item => wasteColors[item.x] || "#999"),
    };

    return (
      <Col xs={12} md={12} lg={12} xl={12}>
        {chartData.length > 0 && (
          <ReactApexChart
            options={chartOptions}
            series={chartData.map(item => item.y)}
            type="radialBar"
            height={chartOptions.chart.height}
          />
        )}
      </Col>
    );
  }
}

export default OverviewRadialBarChart;
