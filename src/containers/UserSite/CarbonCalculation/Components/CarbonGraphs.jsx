/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from "react";
import ReactApexChart from "react-apexcharts";
import "../../../../scss/carbon/report.scss";

// const wastes = {
//   Papers: 'paper',
//   Plastics: 'plastic',
//   Cans: 'can',
//   Glasses: 'glass',
//   'E-waste': 'e-waste',
//   Organic: 'organic',
// };

class Trendline extends PureComponent {
    
  getDirectrecycle = (wasteType) => {
    switch (wasteType) {
      case "Papers":
        return 1.266;
      case "Plastics":
        return 2.148;
      case "Cans":
        return 1.102;
      case "E-waste":
        return 0;
      case "Glasses":
        return 0.569;
      case "Organic":
        return 0;
      default:
        return 0;
    }
  };
  getAvoidedrecycle = (wasteType) => {
    switch (wasteType) {
      case "Papers":
        return 0.971;
      case "Plastics":
        return 1.899;
      case "Cans":
        return 2.949;
      case "E-waste":
        return 0;
      case "Glasses":
        return 1.042;
      case "Organic":
        return 0;
      default:
        return 0;
    }
  };
  getDirectcomposting = (wasteType) => {
    switch (wasteType) {
      case "Organic":
        return 0.177;
      default:
        return 0;
    }
  };
  getAvoidedfertilizer = (wasteType) => {
    switch (wasteType) {
      case "Organic":
        return 0.64539;
      default:
        return 0;
    }
  };
  getAvoidedlandfilling = (wasteType) => {
    switch (wasteType) {
      case "Organic":
        return 0.84;
      default:
        return 0;
    }
  };
  getEwaste = (wasteType) => {
    switch (wasteType) {
      case "E-waste":
        return 1.289;
      default:
        return 0;
    }
  };
  getEwaste2 = (wasteType) => {
    switch (wasteType) {
      case "E-waste":
        return 0.4408;
      default:
        return 0;
    }
  };
  calculateDirectRecycle = (data) => {
    let total = 0;
    Object.keys(data).forEach((item) => {
      const multiplier = this.getDirectrecycle(item);
      total += data[item].total * multiplier;
    });
    return total.toFixed(2);
  };
  calculateAvoidedRecycle = (data) => {
    let total = 0;
    Object.keys(data).forEach((item) => {
      const multiplier = this.getAvoidedrecycle(item);
      total += data[item].total * multiplier;
    });
    return total.toFixed(2);
  };
  calculateNetRecycle = (data) => {
    const directRecycleTotal = parseFloat(this.calculateDirectRecycle(data));
    const avoidedRecycleTotal = parseFloat(this.calculateAvoidedRecycle(data));

    // Calculate the difference
    const difference = directRecycleTotal - avoidedRecycleTotal;

    return difference.toFixed(2);
  };
  calculateDirectComposting = (data) => {
    let total = 0;
    Object.keys(data).forEach((item) => {
      const multiplier = this.getDirectcomposting(item);
      total += data[item].total * multiplier;
    });
    return total.toFixed(2);
  };
  calculateAvoidedfertilizer = (data) => {
    let total = 0;
    Object.keys(data).forEach((item) => {
      const multiplier = this.getAvoidedfertilizer(item);
      total += data[item].total * multiplier;
    });
    return total.toFixed(2);
  };
  calculateAvoidedlandfilling = (data) => {
    let total = 0;
    Object.keys(data).forEach((item) => {
      const multiplier = this.getAvoidedlandfilling(item);
      total += data[item].total * multiplier;
    });
    return total.toFixed(2);
  };
  calculateNetComposting = (data) => {
    const directCompostingTotal = parseFloat(
      this.calculateDirectComposting(data)
    );
    const avoidedFertilizerTotal = parseFloat(
      this.calculateAvoidedfertilizer(data)
    );
    const avoidedLandfillingTotal = parseFloat(
      this.calculateAvoidedlandfilling(data)
    );

    // Calculate the difference
    const difference =
      directCompostingTotal - avoidedFertilizerTotal - avoidedLandfillingTotal;

    return difference.toFixed(2);
  };
  calculateEwaste = (data) => {
    let total = 0;
    Object.keys(data).forEach((item) => {
      const multiplier = this.getEwaste(item);
      total += data[item].total * multiplier;
    });
    return total.toFixed(2);
  };
  calculateEwaste2 = (data) => {
    let total = 0;
    Object.keys(data).forEach((item) => {
      const multiplier = this.getEwaste2(item);
      total += data[item].total * multiplier;
    });
    return total.toFixed(2);
  };
  calculateTotalEwaste = (data) => {
    const plasticEwaste = parseFloat(this.calculateEwaste(data));
    const metalEwaste = parseFloat(this.calculateEwaste2(data));

    const total = plasticEwaste + metalEwaste;

    return total.toFixed(2);
  };
  calculateTotalDirect = (data) => {
    const directRecycling = parseFloat(this.calculateDirectRecycle(data));
    const directComposting = parseFloat(this.calculateDirectComposting(data));

    // Calculate total
    const total = directRecycling + directComposting;

    return total.toFixed(2);
  };
  calculateTotalAvoided = (data) => {
    const avoidedRecycling = parseFloat(this.calculateAvoidedRecycle(data));
    const avoidedFertilizer = parseFloat(this.calculateAvoidedfertilizer(data));
    const avoidedLandfilling = parseFloat(
      this.calculateAvoidedlandfilling(data)
    );

    // Calculate total
    const total = avoidedRecycling + avoidedFertilizer + avoidedLandfilling;

    return total.toFixed(2);
  };
  calculateTotalNet = (data) => {
    const totalDirect = parseFloat(this.calculateTotalDirect(data));
    const totalAvoided = parseFloat(this.calculateTotalAvoided(data));

    const net = totalDirect - totalAvoided;

    return net.toFixed(2);
  };
  render() {
    // const { total } = this.state;
    const { data } = this.props;

    const totallandfill = 0;
    const chartOptions = {
      chart: {
        type: "area",
        stacked: true,
      },
      xaxis: {
        categories: [
          "Papers",
          "Plastics",
          "Cans",
          "E-waste",
          "Glasses",
          "Organic",
        ],
      },
      yaxis: {
        title: {
          text: "GHG Emissions (kg of CO2-eq/tonne)",
        },
      },
    };

    const chartData = {
      series: [
        {
          name: "Net Recycle",
          data: [
            this.calculateNetRecycle(data.Papers),
            this.calculateNetRecycle(data.Plastics),
            this.calculateNetRecycle(data.Cans),
            this.calculateNetRecycle(data["E-waste"]),
            this.calculateNetRecycle(data.Glasses),
            this.calculateNetRecycle(data.Organic),
          ],
        },
        {
          name: "Net Composting",
          data: [
            this.calculateNetComposting(data.Papers),
            this.calculateNetComposting(data.Plastics),
            this.calculateNetComposting(data.Cans),
            this.calculateNetComposting(data["E-waste"]),
            this.calculateNetComposting(data.Glasses),
            this.calculateNetComposting(data.Organic),
          ],
        },
        {
          name: "Total Landfill",
          data: [
            0,
            0,
            0,
            0,
            0,
            totallandfill, // Adjust totallandfill value as needed
          ],
        },
        {
          name: "E-waste",
          data: [
            this.calculateTotalEwaste(data),
            this.calculateTotalEwaste(data),
            this.calculateTotalEwaste(data),
            this.calculateTotalEwaste(data),
            this.calculateTotalEwaste(data),
            this.calculateTotalEwaste(data),
          ],
        },
      ],
    };

    return (
      <div>
        <ReactApexChart
          options={chartOptions}
          series={chartData.series}
          type="area"
          width="100%"
          height={350}
        />
      </div>
    );
  }
}

export default Trendline;
