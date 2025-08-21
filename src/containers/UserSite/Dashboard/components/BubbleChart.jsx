/* eslint-disable react/prop-types */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/no-did-update-set-state */
import React, { PureComponent } from "react";
import ReactApexChart from "react-apexcharts";
import { Col } from "reactstrap";

// Waste label mapping
const wastes = {
  Papers: "Paper",
  Plastics: "Plastic",
  Cans: "Can",
  Glasses: "Glass",
  "E-waste": "E-waste",
  Organic: "Organic",
};

// Color mapping for each waste type
const wasteColors = {
  Paper: "#159e32ff",
  Plastic: "#70df70ff",
  Can: "#184315ff",
  Glass: "#04d400ff",
  "E-waste": "#1ee976ff",
  Organic: "#4CAF50",
};

class OverviewBubbleChart extends PureComponent {
  render() {
    const { data } = this.props;

    // Map data into series format
    const chartData = data.map(item => ({
      x: wastes[item.name],
      y: item.quantity,
      z: item.quantity,
    }));

    // Extract unique colors from the mapped data
    const chartColors = chartData.map(d => wasteColors[d.x] || "#999");

    const chartOptions = {
      chart: {
        type: "bubble",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: chartColors,
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            colors: "#333",
            fontFamily: "Poppins, sans-serif",
          },
        },
        title: {
          text: "Waste Type",
          style: {
            color: "#333",
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            colors: "#333",
            fontFamily: "Poppins, sans-serif",
          },
        },
        title: {
          text: "Quantity (kg)",
          style: {
            color: "#333",
            fontSize: "12px",
            fontFamily: "Poppins, sans-serif",
          },
        },
      },
      tooltip: {
        theme: "light",
        x: {
          show: true,
          formatter: val => `Type: ${val}`,
        },
        y: {
          formatter: val => `${val} kg`,
        },
      },
    };

    return (
      <Col xs={12} md={12} lg={12} xl={12}>
        {chartData.length > 0 && (
          <ReactApexChart
            options={chartOptions}
            series={[
              {
                name: "Waste Quantity",
                data: chartData,
              },
            ]}
            type="bubble"
            height={chartOptions.chart.height}
          />
        )}
      </Col>
    );
  }
}

export default OverviewBubbleChart;
