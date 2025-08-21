/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-len */
import React, { PureComponent } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Row, Col } from 'reactstrap';
import "../../../../scss/carbon/report.scss";
// import Carbongraphs from './CarbonGraphs';

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
        return 0.1770;
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
        return 0.8400;
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
    const directCompostingTotal = parseFloat(this.calculateDirectComposting(data));
    const avoidedFertilizerTotal = parseFloat(this.calculateAvoidedfertilizer(data));
    const avoidedLandfillingTotal = parseFloat(this.calculateAvoidedlandfilling(data));

    // Calculate the difference
    const difference = directCompostingTotal - avoidedFertilizerTotal - avoidedLandfillingTotal;

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
    const avoidedLandfilling = parseFloat(this.calculateAvoidedlandfilling(data));

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
    const directRecycle = this.calculateDirectRecycle(data);
    const avoidedRecycle = this.calculateAvoidedRecycle(data);
    const netRecycle = this.calculateNetRecycle(data);
    const directComposting = this.calculateDirectComposting(data);
    const avoidedFertilizer = this.calculateAvoidedfertilizer(data);
    const avoidedLandfilling = this.calculateAvoidedlandfilling(data);
    const netComposting = this.calculateNetComposting(data);
    const totalDirect = this.calculateTotalDirect(data);
    const totalAvoided = this.calculateTotalAvoided(data);
    const totalNet = this.calculateTotalNet(data);
    const totallandfill = 0;
    const Ewaste = this.calculateTotalEwaste(data);
    const chartData = {
      options: {
        chart: {
          id: 'carbon-emission-chart',
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: 0,
                to: 1000,
                color: '#F15B46',
              }, {
                from: -1000,
                to: 0,
                color: '#FEB019',
              }],
            },
          },
        },
        xaxis: {
          categories: ['Direct', 'Avoided', 'Net'],
        },
        yaxis: {
          title: {
            text: 'GHG Emission of organization in kg',
            style: {
              fontFamily: 'Montserrat',
              fontWeight: 'Bold',
            },
          },
        },
      },
      series: [
        {
          name: 'GHG Emissions',
          data: [totalDirect, totalAvoided, totalNet],
        },
      ],
    };
    const pieChartData = {
      options: {
        labels: ['Direct GHG Emission', 'Avoided GHG Emission'],
      },
      series: [parseFloat(totalDirect), parseFloat(totalAvoided)],
    };
    const recycleData = {
      options: {
        chart: {
          id: 'carbon-emission-chart',
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: 0,
                to: 1000,
                color: '#F15B46',
              }, {
                from: -1000,
                to: 0,
                color: '#FEB019',
              }],
            },
          },
        },
        xaxis: {
          categories: ['Direct', 'Avoided', 'Net'],
        },
        yaxis: {
          title: {
            text: 'GHG Emission of recycling in kg',
            style: {
              fontFamily: 'Montserrat',
              fontWeight: 'Bold',
            },
          },
        },
      },
      series: [
        {
          name: 'GHG Emissions',
          data: [directRecycle, avoidedRecycle, netRecycle],
        },
      ],
    };
    const compostData = {
      options: {
        chart: {
          id: 'carbon-emission-chart',
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: 0,
                to: 1000,
                color: '#F15B46',
              }, {
                from: -1000,
                to: 0,
                color: '#FEB019',
              }],
            },
          },
        },
        xaxis: {
          categories: ['Direct', 'Avoided', 'Avoided', 'Net'],
        },
        yaxis: {
          title: {
            text: 'GHG Emission of composting in kg',
            style: {
              fontFamily: 'Montserrat',
              fontWeight: 'Bold',
            },
          },
        },
      },
      series: [
        {
          name: 'GHG Emissions',
          data: [directComposting, avoidedFertilizer, avoidedLandfilling, netComposting],
        },
      ],
    };


    return (
      <div className="emission-page">
        {/* <Carbongraphs /> */}
        <div className="generation-content">
          <div className="report-title">
            <div className="total-block">
              <div style={{ width: "100%" }}>
                <h5>Total GHG Emission from the organization</h5>
                <Row>
                  <Col>
                    <table>
                      <tr>
                        <td>Direct GHG emissions from the organization </td>
                        <td>
                          <span>{totalDirect}</span> kg of CO2-eq/tonne of mixed
                          recyclables
                        </td>
                      </tr>
                      <tr>
                        <td>Avoided GHG emissions from the organization </td>
                        <td>
                          <span>{totalAvoided}</span> kg of CO2-eq/tonne of
                          mixed recyclables
                        </td>
                      </tr>
                      <tr>
                        <th>Net GHG emissions from the organization </th>
                        <th>
                          <span>{totalNet}</span> kg of CO2-eq/tonne of mixed
                          recyclables
                        </th>
                      </tr>
                    </table>
                    <hr />
                    <div>
                      <h3 className="net-content">
                        A positive value for Net GHG Emission indicates that the
                        organization is a net emitter of GHGs due to waste
                        management activities, while a negative value suggests
                        that the organization waste management practices are
                        reducing GHG emissions, leading to a net reduction in
                        emissions.
                      </h3>
                    </div>
                  </Col>
                  <Col style={{ marginLeft: "9%" }}>
                    <ReactApexChart
                      options={chartData.options}
                      series={chartData.series}
                      type="bar"
                      height={350}
                      width={500}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                    <ReactApexChart
                      options={pieChartData.options}
                      series={pieChartData.series}
                      type="pie"
                      height={220}
                    />
                    <p className="net-content2">
                      Total GHG Emission Visual Chart
                    </p>
                  </Col>
                  <Col>
                    <hr />
                    <br />
                    <div>
                      <p className="net-content">
                        Direct GHG Emission : The greenhouse gas emissions
                        directly produced by an organization.
                      </p>
                      <p className="net-content">
                        Avoided GHG Emission: These are GHG emissions that are
                        avoided or reduced as a result of sustainable waste
                        management practices.
                      </p>
                      <p className="net-content">
                        Net GHG Emission: The Net GHG Emission is the difference
                        between Direct GHG Emission and Avoided GHG Emission.
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <Row>
                <Col>
                  <h5>GHG Emission from Recycling</h5>
                  <h1 className="net-content3">
                    The term GHG emission from recycling refers to the
                    greenhouse gas emissions associated with the process of
                    recycling materials.
                  </h1>
                  <table>
                    <tr>
                      <td>Direct GHG emissions from recycling </td>
                      <td>
                        {directRecycle} kg of CO2-eq/tonne of mixed recyclables
                      </td>
                    </tr>
                    <tr>
                      <td>Avoided GHG emissions from recycling </td>
                      <td>
                        {avoidedRecycle}kg of CO2-eq/tonne of mixed recyclables
                      </td>
                    </tr>
                    <tr>
                      <th>Net GHG emissions from recycling </th>
                      <th>
                        {netRecycle}kg of CO2-eq/tonne of mixed recyclables
                      </th>
                    </tr>
                  </table>
                </Col>
                <Col style={{ marginLeft: "9%" }}>
                  <ReactApexChart
                    options={recycleData.options}
                    series={recycleData.series}
                    type="bar"
                    height={350}
                    width={500}
                  />
                </Col>
              </Row>
              <br />
              <hr />
              <br />
              <br />
              <div style={{ width: "100%" }}>
                <Row>
                  <Col>
                    <ReactApexChart
                      options={compostData.options}
                      series={compostData.series}
                      type="bar"
                      height={350}
                      width={500}
                    />
                  </Col>
                  <Col>
                    <h5>GHG Emission from Composting</h5>
                    <h1 className="net-content3">
                      The Monthly Waste Composition report breaks down the
                      percentage of paper, plastic, and cans within the waste
                      generated each month
                    </h1>
                    <table>
                      <tr>
                        <td>Direct GHG emissions from composting </td>
                        <td>{directComposting}kg of CO2-eq/tonne of waste</td>
                      </tr>
                      <tr>
                        <td>
                          Avoided GHG emissions from chemical fertilizer
                          production{" "}
                        </td>
                        <td>{avoidedFertilizer}kg of CO2-eq/tonne of waste</td>
                      </tr>
                      <tr>
                        <td>
                          Avoided GHG emissions from organic waste landfilling{" "}
                        </td>
                        <td>{avoidedLandfilling}kg of CO2-eq/tonne of waste</td>
                      </tr>
                      <tr>
                        <th>
                          Net GHG emissions from composting (life cycle
                          perspective){" "}
                        </th>
                        <th>{netComposting}kg of CO2-eq/tonne of waste</th>
                      </tr>
                    </table>
                  </Col>
                </Row>
              </div>
              <br />
              <hr />
              <br />
              <br />
              <div className="no-graph">
                <h5>GHG Emission from Landfilling</h5>
                <h1 className="report-content">
                  The Monthly Waste Composition report breaks down the
                  percentage of paper, plastic, and cans within the waste
                  generated each month
                </h1>
                <table>
                  <tr>
                    <td>
                      Direct GHG emission from mixed waste landfilling/open
                      dumping
                    </td>
                    <td>{totallandfill}kg of CO2-eq/tonne of mixed waste</td>
                  </tr>
                  <tr>
                    <th>Total GHG emissions from landfilling </th>
                    <th>{totallandfill}kg of CO2-eq/tonne of mixed waste</th>
                  </tr>
                </table>
              </div>
              <br />
              <hr />
              <br />
              <br />
              <div className="no-graph">
                <h5>GHG Emission from E-waste</h5>
                <h1 className="report-content">
                  The Monthly Waste Composition report breaks down the
                  percentage of paper, plastic, and cans within the waste
                  generated each month
                </h1>
                <table>
                  <tr>
                    <td>
                      Direct GHG emission from mixed waste landfilling/open
                      dumping
                    </td>
                    <td>{Ewaste}kg of CO2-eq/tonne of mixed waste</td>
                  </tr>
                  <tr>
                    <th>Total GHG emissions from landfilling </th>
                    <th>{Ewaste}kg of CO2-eq/tonne of mixed waste</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Trendline;
