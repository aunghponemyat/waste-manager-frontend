import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Button } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getLogisticsByOrganizationWithPromise } from '../../../redux/actions/apiActions/logisticsActions';

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
    getLogisticsByOrganizationWithPromise(this.props.organization)
      .then((response) => {
        if (!response || !Array.isArray(response) || response.length === 0) {
          console.warn("No valid logistics data received:", response);
          return;
        }

        const logisticsByMonths = {};

        // ✅ The for-loop is now inside the check
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
          const quarterKey = `${quarters[QUARTER_NUMBER]} (${monthList[j].split(' ')[1]})`;
          logisticsByQuarters[quarterKey] = {};

          for (let i = j; i < j + 3; i += 1) {
            if (monthList[i]) {
              logisticsByQuarters[quarterKey][monthList[i]] = logisticsByMonths[monthList[i]];
            } else {
              break;
            }
          }
        }

        this.setState({ logisticsByQuarters });
      })
      .catch((error) => {
        console.error("Failed to fetch logistics data:", error);
      });
  }


  handleSubmit = () => {
    const { logisticsByQuarters, quarter } = this.state;

    if (!quarter || !quarter.value) {
      alert('Please select a quarter.');
      return;
    }

    const selectedData = logisticsByQuarters[quarter.value];

    this.props.createQuarter({
      quarter: quarter.value,
      ways: selectedData,
    });

    this.setState({ quarter: null });
  };


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
    // const {
    //   logistics,
    // } = this.props;

    return (
      <div className="modal__body">
        <form className="form form--horizontal">
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
          <Button className="icon" color="success" onClick={() => this.handleSubmit()}>
            <p>
            Show Report →
            </p>
          </Button>
          <br />
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
