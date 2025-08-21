/* eslint-disable react/prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable prefer-template */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/no-did-update-set-state */
import React from 'react';
import { connect } from 'react-redux';
import Picker from 'react-month-picker';
import circle from '../../../shared/img/background/circle.png';

import {
  getTotalWasteByOrganization,
  getTotalPickupsForEachOrganization,
  getContractDurationForEachOrganization,
} from '../../../redux/actions/apiActions/miscActions';

import OverviewPieChart from './components/OverviewPieChart';
import OverviewBarChart from './components/OverviewBarChart';
import OverviewRadialBarChart from './components/OverviewPieChart1';
import OverviewBubbleChart from './components/BubbleChart';
import TrendLineChart from './components/TrendLineChart';
import TotalCollectedWaste from './components/TotalCollectedWaste';
import TotalPickups from './components/TotalPickups';
import MonthBox from './components/MonthBox';

import './Dashboard.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class Dashboard extends React.Component {
  state = {
    rangeValue: {
      from: { year: 2018, month: 4 },
      to: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
    },
    years: {
      min: { year: 2018, month: 4 },
      max: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
    },
    monthlyWaste: null,
    organizationId: null,
    duration: null,
    yearSet: false,
  };

  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const organizationId = user.organizationId._id;

    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({ organizationId });

    this.props.getTotalWasteByOrganization(organizationId);
    this.props.getTotalPickupsForEachOrganization(organizationId);
    this.props.getContractDurationForEachOrganization(organizationId);
  }

  componentDidUpdate() {
    const { monthlyWaste } = this.props.misc;

    if (monthlyWaste && monthlyWaste !== this.state.monthlyWaste) {
      const from = monthlyWaste[0] && monthlyWaste[0].month;
      const to = monthlyWaste[monthlyWaste.length - 1] && monthlyWaste[monthlyWaste.length - 1].month;

      if (!this.state.yearSet) {
        const years = {
          min: { year: new Date(from).getFullYear(), month: new Date(from).getMonth() + 1 },
          max: { year: new Date(to).getFullYear(), month: new Date(to).getMonth() + 1 },
        };

        const rangeValue = {
          from: { year: new Date(from).getFullYear(), month: new Date(from).getMonth() + 1 },
          to: { year: new Date(to).getFullYear(), month: new Date(to).getMonth() + 1 },
        };

        this.setState({ years, rangeValue, yearSet: true });
      }

      this.setState({ monthlyWaste });
    }
  }

  pickRange = React.createRef();

  resetDateRange = () => {
    const { organizationId, years } = this.state;
    const rangeValue = {
      from: years.min,
      to: years.max,
    };

    this.props.getTotalWasteByOrganization(organizationId);
    this.props.getTotalPickupsForEachOrganization(organizationId);
    this.setState({ rangeValue, duration: null });
  };

  _handleClickRangeBox = () => {
    this.pickRange.current.show();
  };

  handleRangeDissmis = (value) => {
    const { organizationId } = this.state;
    const duration = {
      from: new Date(months[value.from.month - 1] + '. ' + value.from.year),
      to: new Date(value.to.year, value.to.month, 0),
    };

    this.props.getTotalWasteByOrganization(organizationId, duration);
    this.props.getTotalPickupsForEachOrganization(organizationId, duration);
    this.setState({ rangeValue: value, duration });
  };

  render() {
    const { misc } = this.props;
    const { rangeValue, years, duration } = this.state;

    const pickerLang = {
      months,
      from: 'From',
      to: 'To',
    };

    const makeText = m => (m && m.year && m.month ? `${months[m.month - 1]}. ${m.year}` : '?');

    // Debugging log
    console.log('monthlyWaste exists?', misc && misc.monthlyWaste);
    console.log('monthlyWaste data:', misc && misc.monthlyWaste);

    return (
      <div className="dashboard-page-content">
        {/* === Dashboard Header === */}
        <div className="dashboard-summary-block">
          <div className="dashboard-summary-text">
            <h2>Dashboard</h2>
            <p>This is the summary of total waste collected by RecyGlo</p>
          </div>
          <div className="dashboard-summary-image">
            <img className="circle-image" alt="RecyGlo Illustration" src={circle} />
          </div>
        </div>

        {/* === Total Cards === */}
        {misc && misc.totalWastesByOrganization && misc.totalPickupsByOrganization && (
          <React.Fragment>
            <TotalCollectedWaste
              collectedWaste={misc.totalWastesByOrganization}
              className="total-collected-waste-block"
            />
            <TotalPickups
              ways={misc.totalPickupsByOrganization}
              className="total-pickups-block"
            />
          </React.Fragment>
        )}

        {/* === Charts === */}
        {misc && misc.totalWastesByOrganization && (
          <React.Fragment>
            <div className="dashboard-block dashboard-chart-card radial-chart-block">
              <h3>Overview Radial Bar Chart</h3>
              <OverviewPieChart data={misc.totalWastesByOrganization} />
            </div>
            <div className="dashboard-block dashboard-chart-card pie-chart-block">
              <h3>Overview Pie Chart</h3>
              <OverviewRadialBarChart data={misc.totalWastesByOrganization} />
            </div>
            <div className="dashboard-block dashboard-chart-card bar-chart-block">
              <h3>Overview Bar Chart</h3>
              <OverviewBarChart data={misc.totalWastesByOrganization} />
            </div>
            <div className="dashboard-block dashboard-chart-card bubble-chart-block">
              <h3>Overview Bubble Chart</h3>
              <OverviewBubbleChart data={misc.totalWastesByOrganization} />
            </div>
          </React.Fragment>
        )}

        {/* === Month Filter === */}
        <div className="dashboard-block dashboard-filter-block filter-block-full-width">
          <label className="filter-label">
            <b>Pick A Span of Months</b>
            <span>(Available years from 2017 to this year)</span>
          </label>
          <div className="filter-controls">
            <Picker
              ref={this.pickRange}
              years={years}
              value={rangeValue}
              lang={pickerLang}
              theme="light"
              onChange={() => {}}
              onDismiss={this.handleRangeDissmis}
            >
              <MonthBox
                className="month-box-input"
                value={`${makeText(rangeValue.from)} ~ ${makeText(rangeValue.to)}`}
                onClick={this._handleClickRangeBox}
              />
            </Picker>
            <button className="btn btn-green reset-button" onClick={this.resetDateRange}>
              Reset
            </button>
          </div>
        </div>

        {/* === Trendline Charts === */}
        {misc && misc.monthlyWaste ? (
          <React.Fragment>
            <div className="dashboard-block dashboard-trendline-card trendline1-block">
              <h3>Your Recycled Waste</h3>
              <p className="chart-description">Trendline of collected waste in RecyGlo audits</p>
              <TrendLineChart duration={duration} />
            </div>
            <div className="dashboard-block dashboard-trendline-card trendline2-block">
              <h3>Your Recycled Waste</h3>
              <p className="chart-description">Trendline of collected waste in RecyGlo audits</p>
              <TrendLineChart duration={duration} />
            </div>
          </React.Fragment>
        ) : (
          <div style={{ gridColumn: '1 / span 2', textAlign: 'center', padding: '20px' }}>
            <p>No trendline data available for the selected period.</p>
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTotalWasteByOrganization: (organizationId, duration) =>
    dispatch(getTotalWasteByOrganization(organizationId, duration)),
  getTotalPickupsForEachOrganization: (organizationId, duration) =>
    dispatch(getTotalPickupsForEachOrganization(organizationId, duration)),
  getContractDurationForEachOrganization: (organizationId, duration) =>
    dispatch(getContractDurationForEachOrganization(organizationId, duration)),
});

const mapStateToProps = state => ({
  misc: state.misc,
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
