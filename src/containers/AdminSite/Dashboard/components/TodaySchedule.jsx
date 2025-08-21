/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */


import React from 'react';
import ChevronLeftIcon from 'mdi-react/ChevronLeftIcon';
import ChevronRightIcon from 'mdi-react/ChevronRightIcon';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import MagnifyIcon from 'mdi-react/MagnifyIcon';

import { getTodayLogisticsSchedule } from '../../../../redux/actions/apiActions/logisticsActions';
import Panel from '../../../../shared/components/Panel';
import BadgeColor from '../../../../shared/components/badgeColor';

class TodaySchedule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      rowsPerPage: 3,
      searchTerm: '',
      sortBy: '',
    };
  }
  componentWillMount() {
    this.props.getTodayLogisticsSchedule();
  }

  render() {
    const { logistics } = this.props;
    const { currentPage, rowsPerPage, searchTerm, sortBy } = this.state;
    const todayList = logistics.today || [];
    const filteredList = todayList.filter(item =>
      item.organizationId.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const sortedList = filteredList.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.pickUpTime) - new Date(a.pickUpTime);
        case 'oldest':
          return new Date(a.pickUpTime) - new Date(b.pickUpTime);
        case 'name':
          return a.organizationId.name.localeCompare(b.organizationId.name);
        // case 'za':
        //   return b.organizationId.name.localeCompare(a.organizationId.name);
        default:
          return 0;
      }
    });

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedList.slice(indexOfFirstRow, indexOfLastRow);
    const totalPages = Math.ceil(sortedList.length / rowsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i += 1) {
      pageNumbers.push(i);
    }

    return (
      <Panel xl={8} lg={12} title="Today Schedule">
        <div className="panel__header-controls">
          <div className="sort__controls" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <select
              value={this.state.sortBy}
              onChange={e => this.setState({ sortBy: e.target.value, currentPage: 1 })}
              className="sort__select"
            >
              <option value="" disabled>Sort by:</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name">Organization Name</option>
            </select>
          </div>
          <div className="search__wrapper">
            <MagnifyIcon size={18} className="search__icon" />
            <input
              type="text"
              placeholder="Search organization..."
              value={this.state.searchTerm}
              onChange={e => this.setState({ searchTerm: e.target.value, currentPage: 1 })}
              className="search__input"
            />
          </div>
        </div>
        <Table responsive className="table--bordered">
          <thead>
            <tr>
              <th>No</th>
              <th>Organization Name</th>
              <th>Pick Up Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {console.log(logistics.wayType)}
            {logistics.today && logistics.today.length > 0 ?
              currentRows.map((prop, index) => (
                <tr key={prop.id || index} className={prop.wayType !== 'undefined' && prop.wayType === 'Dry' ? 'dashboard_wayType_blue' : (prop.wayType === 'Organic' ? 'dashboard_wayType_green' : '')}>
                  <td>{indexOfFirstRow + index + 1}</td>
                  <td>{prop.organizationId.name}</td>
                  <td>{new Date(prop.pickUpTime).toLocaleString()}</td>
                  <td><BadgeColor status={prop.status}>{prop.status}</BadgeColor></td>
                </tr>
              ))
              :
              <tr>
                {/* <td>1</td>
                <td>Test org</td>
                <td>06/03/2025 10:00AM</td>
                <td><Badge color="success">Active</Badge></td> */}
                <td colSpan="4">
                  <h4 style={{ width: '100%', textAlign: 'center' }}>No Schedule Today.</h4>
                </td>
              </tr>
            }
          </tbody>
        </Table>
        {todayList.length > rowsPerPage && (
          <div className="pagination__controls">
            <button
              onClick={() => this.setState({ currentPage: Math.max(currentPage - 1, 1) })}
              disabled={currentPage === 1}
              className="pagination__button"
            >
              <ChevronLeftIcon size={16} />
            </button>

            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => this.setState({ currentPage: number })}
                className={`pagination__button${currentPage === number ? ' active' : ''}`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() => this.setState({ currentPage: Math.min(currentPage + 1, totalPages) })}
              disabled={currentPage === totalPages}
              className="pagination__button"
            >
              <ChevronRightIcon size={16} />
            </button>
          </div>
        )}
      </Panel>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getTodayLogisticsSchedule: () => {
    dispatch(getTodayLogisticsSchedule());
  },
});

const mapStateToProps = state => ({
  logistics: state.logistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(TodaySchedule);
