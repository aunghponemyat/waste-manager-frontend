/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Card, CardBody, Button } from 'reactstrap';
import jwtDecode from 'jwt-decode';
import { connect } from 'react-redux';
import { FaPlus } from 'react-icons/fa';
// import Select from 'react-select';
// import CryptoJS from 'crypto-js';
import { getUserDetailWithPromise } from '../../../../redux/actions/apiActions/userActions';
// import { getWayDetail } from '../../../../redux/actions/apiActions/logisticsActions';
// import { addNewReport } from '../../../../redux/actions/apiActions/ReportsActions';
// import { UPLOAD_IMAGE } from '../../../../redux/actions/apiActions/miscActions';
// import { SET_REPORT_DATA } from '../../../../redux/actions/apiActions/ActionTypes';
import CreateQuarterModal from './CreateQuarterModal';
import Generation from './Generation';
import TrendLineGraph from './TrendLineGraph';
import ItemsFound from './ItemsFound';
import Composition from './Composition';
import TotalComposition from './TotalComposition';
import Summary from './Summary';

const ALL_RECOMMENDATIONS = {
  Papers: [
    'Paper waste can be significantly minimized by setting policies such as to print only when absolutely necessary, to print on both sides of paper, to reserve one- sided paper for reuse and repurpose.',
    'Efficient use of web resources such as Google Docs or Slide Share, and electronic devices such as tablets and computers can also reduce the generation of paper waste.',
    'Digitalization can be integrated into the operations to promote “Green Office” and “Paperless Office” concepts.',
    'Paper waste can be reduced by printing only what is needed and storing soft office copies rather than hard copies.',
    'Reducing the font size and printing margins will also help to reduce paper waste resulting from printing.',
  ],
  Plastics: [
    'Consumption of plastic can be reduced by using water containers and water refill systems. Cups that can be used multiple times are recommended.',
    'Using water bottles, reusable shopping bags, and containers such as lunch boxes are good strategies to reduce plastic.',
    'More compostable and reusable options should be used for common for commonly found single-use materials such as straws or coffee filters.',
    'Employees should be encouraged to use their own bottles instead of buying water PET bottles.',
  ],
  Glasses: [
    'Glass waste can be reduced by reusing glass bottles in different ways.',
  ],
  Organic: [
    'The generation of compostable waste should be monitored and waste composting makes the company more sustainable.',
    'Some important notes about composting are: organic material should be chopped into smaller pieces. Water and oil should be avoided as much as possible. Absorbent materials such as newspaper and used tissues are recommended to be put inside the barrel to absorb the moisture from the food scraps. Bokashi bran should be added to every two inches of compost in order to accelerate the composting process.',
  ],
  '3r': [
    'Keeping the good practices of 3Rs – Reducing, Reusing, and Recycling – is highly recommended.',
    'According to the waste hierarchy practice, waste prevention should be prioritized first, then recovery, and finally recycling to maximize economic and environmental benefits.',
    '3Rs “Reducing, Reusing, and Recycling” should be encouraged as much as possible. ',
    'Awareness orientations and trainings should be provided to the employees to introduce the 5R Policies (Reducing, Reusing, Recycling, Repurposing, and Refusing).',
  ],
};

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

class ReportingForm extends React.Component {
  state = {
    organization: null,
    quarters: {},
    months: 0,
    data: {},
    trendLineData: null,
    totalData: null,
    findings: null,
    recommendations: null,
  }

  componentWillMount() {
    this.getUserDetail();
  }

  getUserDetail = () => {
    const token = localStorage.getItem('jwt');
    const { id } = jwtDecode(token);
    getUserDetailWithPromise(id).then((response =>
      this.setState({
        organization: response.organizationId,
      })
    ));
  }

  getLogisticsData = async () => {
    const { quarters } = this.state;
    // console.log(quarters);
    // for (const key in quarters) {
    //   const ways = [];
    //   for (let i = 0; i < quarters[key].length; i += 1) {
    //     await getWayDetail(quarters[key][i].value)
    //       .then((response) => {
    //         if (JSON.stringify(response.items) === '[]') {
    //           alert(`There is no data for ${new Date(response.pickUpTime).toDateString()}`);
    //           window.location.reload();
    //         }
    //         ways.push(response);
    //       });
    //   }
    //   data[key] = ways;
    // }
    this.setState({ data: quarters });
    this.createTrendLineData();
  }

  createTrendLineData = () => {
    const { quarters } = this.state;
    const data = quarters;
    const products = {};
    const totalData = {};
    const composition = {};
    let totalKg = 0;
    let maxMonth = null;
    let minMonth = null;
    for (const key in data) {
      for (let i = 0; i < data[key].length; i += 1) {
        let date = new Date(data[key][i].pickUpTime);
        if (maxMonth === null || minMonth === null) {
          maxMonth = date;
          minMonth = date;
        } else {
          if (maxMonth < date) {
            maxMonth = date;
          }
          if (minMonth > date) {
            minMonth = date;
          }
        }
        date = date.toLocaleDateString();
        for (let j = 0; j < data[key][i].items.length; j += 1) {
          const { productType } = data[key][i].items[j];
          if (Object.keys(products).includes(productType)) {
            composition[productType] += 1;
            totalData[productType] += data[key][i].items[j].quantity;
            let checked = false;
            for (let k = 0; k < products[productType].length; k += 1) {
              if (products[productType][k].date === date) {
                products[productType][k].value += data[key][i].items[j].quantity;
                totalKg += data[key][i].items[j].quantity;
                checked = true;
                break;
              }
            }
            if (checked === false) {
              products[productType].push({
                date,
                value: data[key][i].items[j].quantity,
              });
              totalKg += data[key][i].items[j].quantity;
            }
          } else {
            composition[productType] = 1;
            totalData[productType] = data[key][i].items[j].quantity;
            products[productType] = [{
              date: new Date(data[key][i].pickUpTime).toLocaleDateString(),
              value: data[key][i].items[j].quantity,
            }];
            totalKg += data[key][i].items[j].quantity;
          }
        }
      }
    }

    const months = [];
    for (const key in data) {
      for (let i = 0; i < data[key].length; i += 1) {
        if (!months.includes(new Date(data[key][i].pickUpTime).getMonth())) {
          months.push(new Date(data[key][i].pickUpTime).getMonth());
        }
      }
    }

    this.setState({ months });

    // console.log(composition);
    // const items = Object.keys(composition).map(key => [key, composition[key]]);

    // // Sort the array based on the second element
    // items.sort((first, second) => second[1] - first[1]);

    // // Create a new array with only the first 5 items
    // console.log(items.slice(0, 5));
    // const keys = [];
    // for (const key in totalData) {
    //   keys[keys.length] = key;
    // }

    // const values = [];
    // for (let i = 0; i < keys.length; i += 1) {
    //   values[values.length] = totalData[keys[i]];
    // }

    // const sortedValues = values.sort(this.sortNumber);
    // console.log(sortedValues.slice(0, 5));
    const recommendations = [];
    while (recommendations.length < 5) {
      for (const key in products) {
        // console.log(ALL_RECOMMENDATIONS[key]);
        if (recommendations.length < 5) {
          if (Object.keys(ALL_RECOMMENDATIONS).includes(key)) {
            recommendations.push(ALL_RECOMMENDATIONS[key][0]);
            ALL_RECOMMENDATIONS[key].shift();
          } else {
            recommendations.push(ALL_RECOMMENDATIONS['3r'][0]);
            ALL_RECOMMENDATIONS['3r'].shift();
          }
        }
      }
    }
    let maxProduct = Object.keys(products)[0];
    Object.keys(products).forEach((key) => {
      maxProduct = (products[key] > products[maxProduct]) ? +key : maxProduct;
    });
    // const maxProduct = product => Object.keys(products).filter(x => products[x] === Math.max.apply(
    //   null,
    //   Object.values(product),
    // ));

    const findings = [
      `${this.state.organization.name} recycled ${totalKg.toFixed(2)} Kg of waste from ${MONTH_NAMES[minMonth.getMonth()]} ${minMonth.getFullYear()} to ${MONTH_NAMES[maxMonth.getMonth()]} ${maxMonth.getFullYear()}.`,
      `The most commonly found waste was ${maxProduct}.`,
      `No mixed trash was found in the audit which states that ${this.state.organization.name} is strong in segregation.`,
    ];
    this.setState({
      trendLineData: products,
      totalData,
      recommendations,
      findings,
    });
  }


  sortNumber = (a, b) => a - b

  redirectToDetail = (logisticsId) => {
    window.open(`/schedules/waste-collection/${logisticsId}`, '_blank');
  }

  createQuarter = (value) => {
    const { quarters } = this.state;
    const ways = [];
    for (const key in value.ways) {
      ways.push(value.ways[key]);
    }
    quarters[value.quarter] = ways;
    this.setState({ quarters });
  }

  render() {
    const {
      organization,
      quarters,
      data,
      trendLineData,
      months,
      totalData,
      recommendations,
      findings,
    } = this.state;
    // const { users } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            {organization &&
              <CreateQuarterModal
                organization={organization._id}
                createQuarter={this.createQuarter}
              />
            }
            <hr />
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
                height: '50px',
              }}
            >
              {JSON.stringify(quarters) !== '{}' &&
                Object.keys(quarters).map((item, key) => (
                  <Button
                    key={key}
                    style={{
                      padding: '0px 10px',
                      margin: '0px 20px',
                      background: '#00c0d4',
                      borderRadius: '30px',
                      color: 'white',
                    }}
                  >
                    {item}
                  </Button>
                ))}
            </span>

            {JSON.stringify(quarters) !== '{}' &&
            <div>
              <Button className="icon" color="success" onClick={() => this.getLogisticsData()}>
                <p>
                  <FaPlus /> Create Report
                </p>
              </Button>
              <hr />
            </div>
            }
            {JSON.stringify(data) !== '{}' &&
              Object.keys(data).map(item => (
                // <p>{JSON.stringify(data[item])}</p>
                <Generation data={data[item]} title={item} organization={organization.name} />
              ))
            }
            {trendLineData &&
              <div>
                <h3 style={{ marginTop: '30px' }}>Trendline Graph</h3>
                <TrendLineGraph data={trendLineData} quarters={Object.keys(data)} organization={organization.name} />
              </div>
            }
            {JSON.stringify(data) !== '{}' &&
              <ItemsFound data={data} reportDate={new Date()} />
            }
            {JSON.stringify(data) !== '{}' &&
              Object.keys(data).map((item, i) => (
                <Composition key={i} data={data[item]} title={item} />
              ))
            }
            {JSON.stringify(data) !== '{}' && months &&
              <TotalComposition months={months} organization={organization.name} data={totalData} quarters={Object.keys(data)} reportDate={new Date()} />
            }
            {JSON.stringify(data) !== '{}' && months && findings && recommendations &&
              <Summary
                organization={organization.name}
                auditStartDate={new Date().toLocaleString()}
                findings={findings}
                recommendations={recommendations}
                months={months.length}
              />
            }
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

export default connect(mapStateToProps)(ReportingForm);
