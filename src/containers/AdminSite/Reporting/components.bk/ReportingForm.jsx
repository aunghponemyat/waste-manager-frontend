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
import { FaPlus } from 'react-icons/fa';
import { connect } from 'react-redux';
import Select from 'react-select';
import CryptoJS from 'crypto-js';
import { getOrganizationList } from '../../../../redux/actions/apiActions/organizationActions';
import { getWayDetail } from '../../../../redux/actions/apiActions/logisticsActions';
import { addNewReport } from '../../../../redux/actions/apiActions/ReportsActions';
import { UPLOAD_IMAGE } from '../../../../redux/actions/apiActions/miscActions';
// import { SET_REPORT_DATA } from '../../../../redux/actions/apiActions/ActionTypes';
import CreateQuarterModal from './CreateQuarterModal';
import Generation from './Graphs/Generation';
import TrendLineGraph from './Graphs/TrendLineGraph';
import Composition from './Graphs/Composition';
import TotalComposition from './Graphs/TotalComposition';
import DetailForm from './DetailForm';
// import history from '../../../../shared/utils/history';

class ReportingForm extends React.Component {
  state = {
    organization: null,
    quarters: {},
    data: {},
    trendLineData: null,
    totalData: null,
  }

  componentWillMount() {
    this.props.getOrganizationList();
  }

  getLogisticsData = async () => {
    const { quarters, data } = this.state;
    for (const key in quarters) {
      const ways = [];
      for (let i = 0; i < quarters[key].length; i += 1) {
        await getWayDetail(quarters[key][i].value)
          .then((response) => {
            if (JSON.stringify(response.items) === '[]') {
              alert(`There is no data for ${new Date(response.pickUpTime).toDateString()}`);
              window.location.reload();
            }
            ways.push(response);
          });
      }
      data[key] = ways;
    }
    console.log(data);
    this.setState(
      { data },
      this.createTrendLineData(),
    );
  }

  createTrendLineData = () => {
    const { data } = this.state;
    const products = {};
    const totalData = {};
    const composition = {};
    for (const key in data) {
      for (let i = 0; i < data[key].length; i += 1) {
        const date = new Date(data[key][i].pickUpTime).toLocaleDateString();
        for (let j = 0; j < data[key][i].items.length; j += 1) {
          const { productType } = data[key][i].items[j];
          if (Object.keys(products).includes(productType)) {
            composition[productType] += 1;
            totalData[productType] += data[key][i].items[j].quantity;
            let checked = false;
            for (let k = 0; k < products[productType].length; k += 1) {
              if (products[productType][k].date === date) {
                products[productType][k].value += data[key][i].items[j].quantity;
                checked = true;
                break;
              }
            }
            if (checked === false) {
              products[productType].push({
                date,
                value: data[key][i].items[j].quantity,
              });
            }
          } else {
            composition[productType] = 1;
            totalData[productType] = data[key][i].items[j].quantity;
            products[productType] = [{
              date: new Date(data[key][i].pickUpTime).toLocaleDateString(),
              value: data[key][i].items[j].quantity,
            }];
          }
        }
      }
    }

    // console.log(composition);
    // const items = Object.keys(composition).map(key => [key, composition[key]]);

    // // Sort the array based on the second element
    // items.sort((first, second) => second[1] - first[1]);

    // // Create a new array with only the first 5 items
    // console.log(items.slice(0, 5));
    console.log(totalData);
    const keys = [];
    for (const key in totalData) {
      keys[keys.length] = key;
    }

    const values = [];
    for (let i = 0; i < keys.length; i += 1) {
      values[values.length] = totalData[keys[i]];
    }

    const sortedValues = values.sort(this.sortNumber);
    console.log(sortedValues.slice(0, 5));

    this.setState({
      trendLineData: products,
      totalData,
    });
  }

  sortNumber = (a, b) => a - b

  redirectToDetail = (logisticsId) => {
    window.open(`/schedules/waste-collection/${logisticsId}`, '_blank');
  }

  handleOrganizationChange = (value) => {
    this.setState({
      organization: value,
    });
  }

  createQuarter = (value) => {
    const { quarters } = this.state;
    quarters[value.quarter] = value.ways;
    this.setState({ quarters });
  }

  handleSubmit = (values) => {
    const finalData = values;
    if (finalData.background && JSON.stringify(finalData.background) !== '[]') {
      // eslint-disable-next-line eqeqeq
      UPLOAD_IMAGE(finalData.background)
        .then((res) => {
          finalData.background = res;
          finalData.organization = this.state.organization.label;
          finalData.data = this.state.data;
          finalData.trendLineData = this.state.trendLineData;
          finalData.totalComposition = this.state.totalData;
          const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(finalData), 'secret key 123');
          const link = ciphertext.toString().replace(/\//gi, 'SLASH');
          addNewReport({
            organization: this.state.organization.value,
            title: finalData.reportTitle,
            data: link,
          }).then((response) => {
            window.open(`/report/${response.data._id}`, '_blank');
          });
        });
    } else {
      delete finalData.background;
      finalData.organization = this.state.organization.label;
      finalData.data = this.state.data;
      finalData.trendLineData = this.state.trendLineData;
      finalData.totalComposition = this.state.totalData;
      const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(finalData), 'secret key 123');
      const link = ciphertext.toString().replace(/\//gi, 'SLASH');
      addNewReport({
        organization: this.state.organization.value,
        title: finalData.reportTitle,
        data: link,
      }).then((response) => {
        window.open(`/report/${response.data._id}`, '_blank');
      });
    }
    // window.open(`/report/${returnData.data._id}`, '_blank');
    // console.log(link.length);
    // window.open(`/report/${link}`, '_blank');
    // const encryptedData = link.replace(/SLASH/gi, '/');
    // console.log(encryptedData);
    // const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret key 123');
    // const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    // console.log(decryptedData);
    // this.setState({
    //   data: decryptedData,
    // });
  }

  render() {
    const {
      organization,
      quarters,
      data,
      trendLineData,
      totalData,
    } = this.state;
    const { organizations } = this.props;
    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
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
                            { key, label: prop.name, value: prop._id }
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
                organization={organization.value}
                createQuarter={this.createQuarter}
              />
            }
            <hr />
            {JSON.stringify(quarters) !== '{}' &&
              Object.keys(quarters).map((item, key) => (
                <span
                  style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  width: '100%',
                  height: '50px',
                  }}
                  key={key}
                >
                  <span style={{
                    width: '150px',
                    fontSize: '17px',
                    fontWeight: 500,
                    color: '#555555',
                    }}
                  >
                    {item} :
                  </span>
                  {quarters[item].map((way, i) => (
                    <Button
                      key={i}
                      style={{
                        padding: '0px 10px',
                        margin: '0px 20px',
                        background: '#00c0d4',
                        borderRadius: '30px',
                        color: 'white',
                      }}
                      onClick={() => this.redirectToDetail(way.value)}
                    >
                      {way.label}
                    </Button>
                  ))}
                </span>
              ))
            }

            {JSON.stringify(quarters) !== '{}' &&
            <Button className="icon" color="success" onClick={() => this.getLogisticsData()}>
              <p>
                <FaPlus /> Create Graph
              </p>
            </Button>
            }
            {JSON.stringify(data) !== '{}' &&
              <div>
                <DetailForm onSubmit={this.handleSubmit} />
                <h3 style={{ marginTop: '30px' }}>Generation Graph</h3>
              </div>
            }
            {JSON.stringify(data) !== '{}' &&
              Object.keys(data).map(item => (
                // <p>{JSON.stringify(data[item])}</p>
                <Generation data={data[item]} title={item} organization={organization.label} />
              ))
            }
            {trendLineData &&
              <div>
                <h3 style={{ marginTop: '30px' }}>Trendline Graph</h3>
                <TrendLineGraph data={trendLineData} organization={organization.label} />
              </div>
            }
            {JSON.stringify(data) !== '{}' &&
              <h3 style={{ marginTop: '30px' }}>Composition Graph</h3>
            }
            {JSON.stringify(data) !== '{}' &&
              Object.keys(data).map(item => (
                // <p>{JSON.stringify(data[item])}</p>
                <Composition data={data[item]} title={item} />
              ))
            }
            {totalData &&
              <div>
                <h3 style={{ marginTop: '30px' }}>Total Composition Graph</h3>
                <TotalComposition data={totalData} organization={organization.label} />
              </div>
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
  // setReportData: (data) => {
  //   dispatch({
  //     type: SET_REPORT_DATA,
  //     payload: data,
  //   });
  // },
});

const mapStateToProps = state => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportingForm);
