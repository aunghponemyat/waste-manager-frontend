import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getLogisticsByOrganizationWithPromise } from '../../../../redux/actions/apiActions/logisticsActions';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

const quarters = ['First Quarter', 'Second Quarter', 'Third Quarter', 'Fourth Quarter'];

class CreateQuarterModal extends React.PureComponent {
  static propTypes = {
    organization: PropTypes.string.isRequired,
    createQuarter: PropTypes.func.isRequired,
  };

  state = {
    quarter: null,
    logisticsByQuarters: {},
    loading: true,
    error: null,
  };

  componentDidMount() {
    const { organization } = this.props;

    if (!organization) {
      console.warn('No organization passed to CreateQuarterModal.');
      // eslint-disable-next-line react/no-did-mount-set-state
      this.setState({ loading: false, error: 'Missing organization ID.' });
      return;
    }
    // eslint-disable-next-line no-underscore-dangle
    console.log("Org id", organization);
    getLogisticsByOrganizationWithPromise(organization)
      .then((response) => {
        if (!Array.isArray(response) || response.length === 0) {
          this.setState({ logisticsByQuarters: {}, loading: false });
          return;
        }
        const logisticsByMonths = {};
        response.forEach((item) => {
          const date = new Date(item.pickUpTime);
          const month = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
          if (!logisticsByMonths[month]) {
            logisticsByMonths[month] = [item];
          } else {
            logisticsByMonths[month].push(item);
          }
        });

        const monthList = Object.keys(logisticsByMonths).sort((a, b) => new Date(a) - new Date(b));
        const logisticsByQuarters = {};

        for (let j = 0; j < monthList.length; j += 3) {
          const quarterIndex = Object.keys(logisticsByQuarters).length % 4;
          const quarterName = `${quarters[quarterIndex]} (${monthList[j].split(' ')[1]})`;
          logisticsByQuarters[quarterName] = {};

          // eslint-disable-next-line no-plusplus
          for (let i = j; i < j + 3; i++) {
            if (monthList[i]) {
              logisticsByQuarters[quarterName][monthList[i]] = logisticsByMonths[monthList[i]];
            }
          }
        }

        this.setState({ logisticsByQuarters, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching logistics:', error);
        this.setState({ logisticsByQuarters: {}, loading: false, error: 'Failed to fetch logistics data.' });
      });
  }

  handleSubmit = () => {
    const { logisticsByQuarters, quarter } = this.state;

    if (!quarter) {
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
    this.setState({ quarter: value });
  };

  render() {
    const { quarter, logisticsByQuarters } = this.state;

    return (
      <div className="modal__body">
        <form
          className="form form--horizontal"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            marginTop: '1rem',
          }}
        >
          {logisticsByQuarters && (
            <div style={{ width: '320px' }}>
              <Select
                name="ways"
                options={Object.keys(logisticsByQuarters).map((prop, key) => ({
                  key,
                  label: `${prop} ${JSON.stringify(Object.keys(logisticsByQuarters[prop]))}`,
                  value: prop,
                }))}
                value={quarter}
                onChange={this.handleQuarterChange}
                isClearable={false}
                placeholder="Choose Quarter"
                classNamePrefix="react-select"
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    borderRadius: '12px',
                    fontSize: '1rem',
                    borderColor: state.isFocused ? '#28a745' : '#ced4da',
                    boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(40, 167, 69, 0.25)' : 'none',
                    '&:hover': {
                      borderColor: '#28a745',
                    },
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    // eslint-disable-next-line no-nested-ternary
                    backgroundColor: state.isFocused
                      ? '#e9f5ee'
                      : state.isSelected
                        ? '#28a745'
                        : undefined,
                    color: state.isSelected ? 'white' : '#333',
                    borderRadius: '8px',
                    fontSize: '1rem',
                  }),
                  menu: provided => ({
                    ...provided,
                    borderRadius: '12px',
                    zIndex: 9999,
                  }),
                }}
              />
            </div>
          )}
          <Button
            onClick={this.handleSubmit}
            disabled={!quarter}
            style={{
              backgroundColor: '#3f8950',
              color: '#fff',
              border: 'none',
              padding: '0.6rem 1.5rem',
              fontSize: '1rem',
              borderRadius: '8px',
              transition: 'background-color 0.3s ease',
              width: '320px',
            }}
            // eslint-disable-next-line no-return-assign
            onMouseOver={e => (e.target.style.backgroundColor = '#218838')}
            // eslint-disable-next-line no-return-assign
            onMouseOut={e => (e.target.style.backgroundColor = '#28a745')}
          >
            Create Report
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  logistics: state.logistics,
});

export default connect(mapStateToProps)(CreateQuarterModal);
