/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
import React from 'react';
import { Col, Card, CardBody, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { FaDownload } from 'react-icons/fa';
import Select from 'react-select';
import CryptoJS from 'crypto-js';

import { getOrganizationList } from '../../../../redux/actions/apiActions/organizationActions';
import { addNewReport } from '../../../../redux/actions/apiActions/ReportsActions';
import CreateQuarterModal from './CreateQuarterModal';
import Generation from './Generation';
import TrendLineGraph from './TrendLineGraph';
import ItemsFound from './ItemsFound';
import Composition from './Composition';
import TotalComposition from './TotalComposition';
import Summary from './Summary';
import downloadPdf from '../../../../shared/utils/directDownload';

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const WASTES = {
  Papers: 'Paper',
  Plastics: 'Plastic',
  Cans: 'Can',
  Glasses: 'Glass',
  'E-waste': 'E-waste',
  Organic: 'Organic',
};

class ReportingFormWithAutoSummary extends React.Component {
  state = {
    organization: null,
    data: {},
    generationData: null,
    trendlineData: null,
    totalCompositionData: null,
    findings: null,
    recommendations: null,
    reportId: null,
  }

  componentWillMount() {
    this.props.getOrganizationList();
  }

  sortNumber = (a, b) => console.log(a - b)

  createQuarter = (value) => {
    // const data = {};
    // let ways = [];
    // for (const key in value.ways) {
    //   ways = ways.concat(value.ways[key]);
    // }
    // data[value.quarter] = ways;
    this.createGenerationData(value);
    this.setState({
      data: value,
    });
  }

  sortCompositionData = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const valueA = a.value;
    const valueB = b.value;
    let comparison = 0;
    if (valueA < valueB) {
      comparison = 1;
    } else if (valueA > valueB) {
      comparison = -1;
    }
    return comparison;
  }

  sortTrendlineData = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const valueA = a.date;
    const valueB = b.date;
    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if (valueA < valueB) {
      comparison = -1;
    }
    return comparison;
  }

  createGenerationData = (value) => {
    const data = value.ways;
    const generationData = {};
    const trendlineData = {};
    let totalCompositionData = {};
    let totalKg = 0;
    let maxMonth = null;
    let minMonth = null;
    const dates = [];
    // // calculate total weight and create data for bar chart
    for (const key in data) {
      const productTypes = {};
      let tmp = [];
      generationData[key] = { total: 0 };
      for (let i = 0; i < data[key].length; i += 1) {
        let date = new Date(data[key][i].pickUpTime);
        date.setDate(1);
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

        if (!dates.includes(date)) {
          dates.push(date);
        }
        for (let j = 0; j < data[key][i].items.length; j += 1) {
          totalKg += data[key][i].items[j].quantity;

          const { productType } = data[key][i].items[j];

          generationData[key].total += data[key][i].items[j].quantity; // total weight calculation

          // Create Generation Data
          if (!Object.keys(productTypes).includes(productType)) {
            productTypes[productType] = Object.keys(productTypes).length;
            tmp.push({
              name: WASTES[productType],
              value: parseFloat(data[key][i].items[j].quantity.toFixed(2)),
            });
          } else {
            // eslint-disable-next-line operator-assignment
            tmp[productTypes[productType]].value += data[key][i].items[j].quantity;
            tmp[productTypes[productType]].value =
            parseFloat((tmp[productTypes[productType]].value).toFixed(2));
          }

          // Create Trendline Data
          const quantity = parseFloat(data[key][i].items[j].quantity.toFixed(2));
          if (!Object.keys(trendlineData).includes(productType)) {
            totalCompositionData[productType] = quantity;
            trendlineData[productType] = { data: [{ date, value: quantity }], total: quantity };
          } else {
            let dateContained = false;
            totalCompositionData[productType] += quantity;
            for (let k = 0; k < trendlineData[productType].data.length; k += 1) {
              if (trendlineData[productType].data[k].date === date) {
                trendlineData[productType].data[k].value += quantity;
                trendlineData[productType].total += quantity;
                dateContained = true;
                break;
              }
              // else {
              //   trendlineData[productType].data.push({ date, value: data[key][i].items[j].quantity });
              //   trendlineData[productType].total += data[key][i].items[j].quantity;
              //   break;
              // }
            }
            if (dateContained === false) {
              trendlineData[productType].data.push({ date, value: quantity });
              trendlineData[productType].total += quantity;
            }
          }
        }
      }
      generationData[key].chartData = tmp;
      tmp = [];
    }

    // Adding 0 data
    for (const key in trendlineData) {
      const tmp = [];
      for (let i = 0; i < trendlineData[key].data.length; i += 1) {
        tmp.push(trendlineData[key].data[i].date);
      }
      const filteredDate = dates.filter(item => !tmp.includes(item));
      for (const date in filteredDate) {
        trendlineData[key].data.push({ date: filteredDate[date], value: 0 });
      }
      trendlineData[key].data.sort(this.sortTrendlineData);
    }

    const tmp = [];

    for (const key in totalCompositionData) {
      tmp.push({
        name: WASTES[key],
        value: totalCompositionData[key],
      });
    }
    totalCompositionData = tmp;

    totalCompositionData.sort(this.sortCompositionData);

    const findings = [
      `${this.state.organization.value.name} recycled ${totalKg.toFixed(2)} Kg of waste from ${MONTH_NAMES[minMonth.getMonth()]} ${minMonth.getFullYear()} to ${MONTH_NAMES[maxMonth.getMonth()]} ${maxMonth.getFullYear()}.`,
      `The most commonly found waste was ${totalCompositionData[0].name.toLowerCase()}.`,
      `No mixed trash was found in the audit which states that ${this.state.organization.name} is strong in segregation.`,
      `The most common percentage of waste was ${totalCompositionData[0].name.toLowerCase()} occupying ${((totalCompositionData[0].value / totalKg) * 100).toFixed(2)} % of total waste
      ${totalCompositionData.length > 1 && ', followed by '} ${totalCompositionData.slice(1, totalCompositionData.length).map(key => ` ${key.name.toLowerCase()} with ${((key.value / totalKg) * 100).toFixed(2)}%`)}.`,
    ];

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
      General: [
        'According to the waste hierarchy practice, waste prevention should be prioritized first, then recovery, and finally recycling to maximize economic and environmental benefits.',
        'Providing waste management training to employees can improve the overall waste recycling efficiency and reduces the contamination of the recyclables.',
        'To prevent non-recyclable waste mixing with the recyclable ones, signage and clear instructions should be displayed near the waste bins.',
        'Recycling tips and awareness posters can be posted around the office to engage more people in recycling.',
        'Sustainable alternatives such as looking for products with less packaging or refusing to use disposable products should be promoted to reduce waste generation.',
        '“Green office” and “Zero Landfill” concepts can be introduced to the employees with in-house policies, trainings, orientations and waste awareness campaign.',
        'New sustainable waste management solutions such as composting can be integrated into your operations to be an eco-friendly enterprise.',
      ],
    };


    const recommendations = [];
    while (recommendations.length < 3) {
      for (const key in trendlineData) {
        if (recommendations.length < 3) {
          if (Object.keys(ALL_RECOMMENDATIONS).includes(key)) {
            recommendations.push(ALL_RECOMMENDATIONS[key][0]);
            ALL_RECOMMENDATIONS[key].shift();
          }
        }
      }
    }
    recommendations.push(ALL_RECOMMENDATIONS['3r'][Math.floor(Math.random() * ALL_RECOMMENDATIONS['3r'].length)]);
    recommendations.push(ALL_RECOMMENDATIONS.General[Math.floor(Math.random() * ALL_RECOMMENDATIONS.General.length)]);

    this.setState({
      generationData,
      trendlineData,
      totalCompositionData,
      findings,
      recommendations,
    });
    const reportData = {
      data: value,
      reportTitle: value.quarter,
      organization: this.state.organization.value,
      reportDate: new Date(),
      auditStartDate: minMonth,
      generationData,
      trendlineData,
      totalCompositionData,
      findings,
      recommendations,
      minMonth,
      maxMonth,
    };
    this.savePdf(reportData);
  }

  savePdf = (data) => {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
    const link = ciphertext.toString().replace(/\//gi, 'SLASH');
    addNewReport({
      organization: this.state.organization.value._id,
      title: data.reportTitle,
      data: link,
    }).then((response) => {
      this.setState({
        reportId: response.data._id,
      });
      console.log("ReportId", reportId)

      // downloadPdf(response.data._id);
      // const opts = {
      //   uri: 'https://api.sejda.com/v2/html-pdf',
      //   headers: {
      //     Authorization: `Token: ${'api_62FC618F2C484B9ABBEF48B79C32E92F'}`,
      //   },
      //   json: {
      //     url: `https://recyglo.info/pdf_report/${response.data._id}`,
      //     viewportWidth: 1200,
      //   },
      // };
      // window.open(`/pdf_report/${response.data._id}`, '_blank');
    });
  }

  handleDownload = () => {
    const reportId = this.state.reportId;
    downloadPdf(reportId);
  };

  handleOrganizationChange = (value) => {
    this.setState({
      organization: value,
    });
  }

  render() {
    const {
      organization,
      data,
      generationData,
      trendlineData,
      totalCompositionData,
      findings,
      recommendations,
    } = this.state;
    const { organizations } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <p>Our Waste Management Report identifies, quantifies, and analyses the composition of the waste stream generated to ensure compliance with the requirements suggested by the ISO 14001-2015 requirement, YCDC, and regional environmental agencies in South East Asia. Our audit methodology collects your waste through bins and we provide you with feedback on the gathered data. Waste audit quarter reports are performed quarterly since the starting date of the contract. We illustrate with figures the collected weight and percentage of each type of waste and the total amount of all the categories reflected in the audit for a better understanding of waste trends and facilitate decision-making on office policies.</p>
            <p>You can download the resulting quarterly reports containing the quantity and qualityof the recyclable waste in a combination of formats including graphs, charts, and spreadsheets. We also provide you with general recommendations to improve the waste management at the workplace</p>
            <p>We very much welcome your feedback! If you have any suggestion or would love to have any more data reflected on our dashboard let us know at <a href="mailto:contact@recyglo.com">contact@recyglo.com</a> or <a href="tel:+959404245800">+95-9-40424-5800</a>.</p>
            <hr />
            <form className="form form--horizontal">
              <div className="form__form-group">
                <span className="form__form-group-label">Customer</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-input-wrap">
                    {organizations &&
                      <Select
                        name="organizations"
                        value={organization}
                        onChange={this.handleOrganizationChange}
                        options={organizations.list
                          && organizations.list.map((prop, key) => (
                          // eslint-disable-next-line no-underscore-dangle
                            { key, label: prop.name, value: prop }
                          ))
                        }
                        clearable={false}
                        className="react-select"
                        placeholder="Choose Customer"
                        classNamePrefix="react-select"
                      />
                    }
                  </div>
                </div>
              </div>
            </form>
            {organization &&
              <CreateQuarterModal
                organization={organization.value._id}
                createQuarter={this.createQuarter}
              />
            }
            <hr />
            {JSON.stringify(data) !== '{}' && generationData &&
              <Generation data={generationData} title={data.quarter} organization={organization.value.name} />
            }
            {trendlineData &&
              <TrendLineGraph data={trendlineData} months={Object.keys(data.ways)} organization={organization.value.name} />
            }
            {JSON.stringify(data) !== '{}' &&
              <ItemsFound data={data} reportDate={new Date()} />
            }
            {JSON.stringify(data) !== '{}' && generationData &&
              <Composition data={generationData} title={data.quarter} />
            }
            {JSON.stringify(data) !== '{}' && generationData &&
              <TotalComposition months={Object.keys(data.ways)} organization={organization.value.name} data={totalCompositionData} quarter={data.quarter} />
            }
            {JSON.stringify(data) !== '{}' && findings && recommendations &&
              <Summary
                organization={organization.value.name}
                auditStartDate={Object.keys(data.ways)[0]}
                findings={findings}
                recommendations={recommendations}
                months={Object.keys(data.ways).length}
              />
            }
            {JSON.stringify(data) !== '{}' &&
              <Button className="icon" color="success" onClick={() => this.handleDownload()}>
                <p>
                  <FaDownload /> Download Report
                </p>
              </Button>
            }
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getOrganizationList: () => {
    dispatch(getOrganizationList());
  },
});

const mapStateToProps = state => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportingFormWithAutoSummary);
