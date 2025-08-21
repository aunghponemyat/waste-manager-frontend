import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Button } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getLogisticsByOrganizationWithPromise } from '../../../../redux/actions/apiActions/logisticsActions';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const quarters = ['First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter'];

class CreateQuarterModal extends React.PureComponent {
  static propTypes = {
    organization: PropTypes.string.isRequired,
    createQuarter: PropTypes.func.isRequired,
  };

  state = {
    quarter: null,
    logisticsByQuarters: [],
  }

  componentWillMount() {
    getLogisticsByOrganizationWithPromise(this.props.organization).then((response) => {
      const logisticsByMonths = {};
      // console.log(response);
      for (let i = 0; i < response.length; i += 1) {
        // eslint-disable-next-line max-len
        const month = `${monthNames[new Date(response[i].pickUpTime).getMonth()]} ${new Date(response[i].pickUpTime).getFullYear()}`;
        if (!Object.keys(logisticsByMonths).includes(month)) {
          logisticsByMonths[month] = [response[i]];
        } else {
          logisticsByMonths[month].push(response[i]);
        }
      }
      // console.log(logisticsByMonths);
      const monthList = Object.keys(logisticsByMonths).slice().sort((a, b) => new Date(a) - new Date(b));
      const newMonthList = [];
      // console.log(monthList);
      for (let i = 0; i < monthList.length; i += 1) {
        const currentMonth = new Date(monthList[i]);
        // console.log(currentMonth);
        let nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        // console.log(currentMonth);
        // console.log(nextMonth);
        // console.log(new Date(monthList[i + 1]));
        // console.log(nextMonth.toDateString() !== new Date(monthList[i + 1]).toDateString());
        newMonthList.push(`${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`);
        while (monthList[i + 1] && nextMonth.toDateString() !== new Date(monthList[i + 1]).toDateString()) {
          newMonthList.push(`${monthNames[nextMonth.getMonth()]} ${nextMonth.getFullYear()}`);
          nextMonth = this.getNextMonth(nextMonth);
        }
        // if (monthList[i + 1] && nextMonth.toDateString() !== new Date(monthList[i + 1]).toDateString()) {
        //   // monthList.splice(i + 1, 0, nextMonth);
        //   newMonthList.push(`${monthNames[nextMonth.getMonth()]} ${nextMonth.getFullYear()}`);
        //   this.getNextMonth(nextMonth);
        // }
      }
      // console.log(newMonthList);
      const logisticsByQuarters = {};
      for (let j = 0; j < newMonthList.length - 1; j += 3) {
        const QUARTER_NUMBER = (Object.keys(logisticsByQuarters).length) % 4;
        logisticsByQuarters[`${quarters[QUARTER_NUMBER]} (${newMonthList[j].split(' ')[1]})`] = {};
        for (let i = j; i < j + 3; i += 1) {
          if (logisticsByMonths[newMonthList[i]]) {
            // eslint-disable-next-line max-len
            logisticsByQuarters[`${quarters[QUARTER_NUMBER]} (${newMonthList[j].split(' ')[1]})`][newMonthList[i]] = logisticsByMonths[newMonthList[i]];
          } else if (!newMonthList[i]) {
            // console.log(getNextMonth(newMonthList[i-1]));
            logisticsByQuarters[
              `${quarters[QUARTER_NUMBER]} (${newMonthList[j].split(' ')[1]})`
            ][this.formatMonthYear(this.getNextMonth(new Date(newMonthList[i - 1])))] = [];
          } else {
            logisticsByQuarters[`${quarters[QUARTER_NUMBER]} (${newMonthList[j].split(' ')[1]})`][newMonthList[i]] = [];
          }
          // console.log(Object.keys(logisticsByMonths)[i]);
          // if (Object.keys(logisticsByMonths)[i]) {
          // eslint-disable-next-line max-len
          //   logisticsByQuarters[`${quarters[QUARTER_NUMBER]} (${newMonthList[j].split(' ')[1]})`][newMonthList[i]] = logisticsByMonths[newMonthList[i]];
          // } else {
          //   break;
          // }
        }
      }
      // console.log(logisticsByQuarters);
      this.setState({ logisticsByQuarters });
    });
  }

  // getNextMonth = (currentMonth) => {
  //   return new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
  // }

  componentWillUpdate(nextProps) {
    if (nextProps.organization !== this.props.organization) {
      getLogisticsByOrganizationWithPromise(nextProps.organization).then((response) => {
        const logisticsByMonths = {};
        for (let i = 0; i < response.length - 1; i += 1) {
          // eslint-disable-next-line max-len
          const month = `${monthNames[new Date(response[i].pickUpTime).getMonth()]} ${new Date(response[i].pickUpTime).getFullYear()}`;
          if (!Object.keys(logisticsByMonths).includes(month)) {
            logisticsByMonths[month] = [response[i]];
          } else {
            logisticsByMonths[month].push(response[i]);
          }
        }
        const monthList = Object.keys(logisticsByMonths).slice().sort((a, b) => new Date(a) - new Date(b));
        const logisticsByQuarters = {};
        for (let j = 0; j < monthList.length - 1; j += 3) {
          const QUARTER_NUMBER = (Object.keys(logisticsByQuarters).length) % 4;
          logisticsByQuarters[`${quarters[QUARTER_NUMBER]} (${monthList[j].split(' ')[1]})`] = {};
          for (let i = j; i < j + 3; i += 1) {
            if (Object.keys(logisticsByMonths)[i]) {
              // eslint-disable-next-line max-len
              logisticsByQuarters[`${quarters[QUARTER_NUMBER]} (${monthList[j].split(' ')[1]})`][monthList[i]] = logisticsByMonths[monthList[i]];
            } else {
              break;
            }
          }
        }
        this.setState({ logisticsByQuarters });
      });
    }
  }

  getNextMonth = currentMonth => new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

  formatMonthYear = date => `${monthNames[date.getMonth()]} ${date.getFullYear()}`;

  // componentDidUpdate() {
  //   console.log('did update');
  // }

  handleSubmit = () => {
    const { logisticsByQuarters, quarter } = this.state;
    // let ways = [];
    // for (let i = 0; i < months.length; i += 1) {
    //   const z = ways.concat(logisticsByMonths[months[i].value]);
    //   console.log(z);
    //   ways = z;
    // }
    // if (!this.state.quarter || ways.length <= 0) {
    //   alert('Please select required fields.');
    // } else {
    //   this.props.createQuarter({
    //     quarter: this.state.quarter.value,
    //     ways,
    //   });
    //   this.setState({
    //     quarter: null,
    //   });
    // }
    this.props.createQuarter({
      quarter: quarter.value,
      ways: logisticsByQuarters[quarter.value],
    });
  }

  handleQuarterChange = (value) => {
    this.setState({
      quarter: value,
    });
  }

  // handleWaysChange = (value) => {
  //   this.setState({
  //     ways: value,
  //   });
  // }


  render() {
    const {
      quarter, logisticsByQuarters,
    } = this.state;

    return (
      <div className="modal__body">
        <form className="form form--horizontal">
          {/* <div className="form__form-group">
            <span className="form__form-group-label">Quarter</span>
            <div className="form__form-group-field">
              <div className="form__form-group-input-wrap">
                <Select
                  name="organizations"
                  options={[
                    { label: 'First Quarter', value: 'First Quarter' },
                    { label: 'Second Quarter', value: 'Second Quarter' },
                    { label: 'Third Quarter', value: 'Third Quarter' },
                    { label: 'Forth Quarter', value: 'Forth Quarter' },
                  ]}
                  value={quarter}
                  onChange={this.handleQuarterChange}
                  clearable={false}
                  className="react-select"
                  placeholder="Choose Quarter"
                  classNamePrefix="react-select"
                />
              </div>
            </div>
          </div> */}

          {/* <div className="form__form-group">
            <span className="form__form-group-label">Ways</span>
            <div className="form__form-group-field">
              <div className="form__form-group-input-wrap">
                {logistics.list &&
                  <Select
                    isMulti
                    name="ways"
                    options={logistics.list
                      && logistics.list.map((prop, key) => (
                        // eslint-disable-next-line no-underscore-dangle
                        { key, label: new Date(prop.pickUpTime).toDateString(), value: prop._id }
                      ))
                    }
                    value={ways}
                    onChange={this.handleWaysChange}
                    clearable={false}
                    className="react-select"
                    placeholder="Choose Quarter"
                    classNamePrefix="react-select"
                  />
                }
              </div>
            </div>
          </div> */}
          {/* <div className="form__form-group">
            <span className="form__form-group-label">Months</span>
            <div className="form__form-group-field">
              <div className="form__form-group-input-wrap">
                {logisticsByMonths &&
                  <Select
                    isMulti
                    name="ways"
                    options={logisticsByMonths
                      // eslint-disable-next-line max-len
                      && Object.keys(logisticsByMonths).slice().sort((a, b)
                       => new Date(b) - new Date(a)).map((prop, key) => (
                        // eslint-disable-next-line no-underscore-dangle
                        { key, label: prop, value: prop }
                      ))
                    }
                    value={months}
                    onChange={this.handleMonthChange}
                    clearable={false}
                    className="react-select"
                    placeholder="Choose Quarter"
                    classNamePrefix="react-select"
                  />
                }
              </div>
            </div>
          </div> */}
          <div className="form__form-group">
            <span className="form__form-group-label">Quarters</span>
            <div className="form__form-group-field">
              <div className="form__form-group-input-wrap">
                {logisticsByQuarters &&
                  <Select
                    name="ways"
                    options={
                      Object.keys(logisticsByQuarters).map((prop, key) => (
                        // eslint-disable-next-line no-underscore-dangle
                        { key, label: `${prop} ${JSON.stringify(Object.keys(logisticsByQuarters[prop]))}`, value: prop }
                      ))
                    }
                    value={quarter}
                    onChange={this.handleQuarterChange}
                    clearable={false}
                    className="react-select"
                    placeholder="Choose Quarter"
                    classNamePrefix="react-select"
                  />
                }
              </div>
            </div>
          </div>
          <Button className="icon" color="success" onClick={() => this.handleSubmit()}>
            <p>
              <FaPlus /> Create Graphs
            </p>
          </Button>
        </form>
      </div>
    );
  }
}

// const mapDispatchToProps = dispatch => ({
//   getLogisticsByOrganization: (organizationId) => {
//     dispatch(getLogisticsByOrganization(organizationId));
//   },
// });

const mapStateToProps = state => ({
  logistics: state.logistics,
});

export default connect(mapStateToProps)(CreateQuarterModal);
