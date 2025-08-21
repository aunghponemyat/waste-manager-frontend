/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  Col,
} from 'reactstrap';
import Select from 'react-select';
import { connect } from 'react-redux';

// import { CHANGE_FILTER_ORGANIZATION } from '../../../../redux/actions/apiActions/ActionTypes';
import { getOrganizationList } from '../../../../redux/actions/apiActions/organizationActions';
import { changeFilter } from '../../../../redux/actions/apiActions/miscActions';


class MontlyWasteCollection extends PureComponent {
  state = {
    organizations: [],
    organizationList: [],
  }

  componentWillMount() {
    this.props.getOrganizationList();
  }

  componentDidUpdate() {
    // console.log(this.props.organizations.list);
    if (this.props.organizations.list && this.state.organizationList !== this.props.organizations.list) {
      // eslint-disable-next-line no-underscore-dangle
      const organizations = this.props.organizations.list.map(item => ({ value: item._id, label: item.name }));
      // console.log(organizations);
      // organizations.splice(0, 0, { value: '', label: 'All', isDisabled: true });
      this.setState({
        organizations,
        organizationList: this.props.organizations.list,
      });
    }
  }

  handleChange = (value) => {
    this.props.changeFilter(value.value);
  };

  render() {
    // const organizationList = this.props.organizations.list;
    const { organizations } = this.state;
    const customStyles = {
      placeholder: provided => ({
        ...provided,
        fontFamily: 'Poppins',
      }),
      control: provided => ({
        ...provided,
        backgroundColor: '#f5f5f5',
        borderColor: '#3498db',
        width: '90%',
        margin: '0 0 0 50px',
        fontFamily: 'Roboto, sans-serif',
        fontSize: 16,
        color: '#333',
        minHeight: 44,
      }),
      singleValue: provided => ({
        ...provided,
        color: '#2c3e50',
        fontWeight: 500,
      }),
      menu: provided => ({
        ...provided,
        backgroundColor: '#fff',
        border: '1px solid #3498db',
        fontSize: 16,
        fontFamily: 'Poppins',
      }),
      option: (provided, state) => {
        let backgroundColor;
        if (state.isSelected) {
          backgroundColor = '#3498db';
        } else if (state.isFocused) {
          backgroundColor = '#ecf0f1';
        } else if (state.isDisabled) {
          return {
            ...provided,
            color: '#999',
            backgroundColor: '#f0f0f0',
            cursor: 'not-allowed',
          };
        } else {
          backgroundColor = '#fff';
        }
        return {
          ...provided,
          color: state.isSelected ? '#fff' : '#333',
          backgroundColor,
          cursor: 'pointer',
        };
      },
    };
    return (
      <div className="filter__wrap">
        <h4>Please select organization to filter result in the following charts</h4>
        {organizations &&
        <Col style={{ width: 400, margin: 30 }}>
          <Select
            name="Organizations"
            onChange={this.handleChange}
            options={organizations}
            clearable={false}
            styles={customStyles}
            placeholder="Organizations"
          />
        </Col>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getOrganizationList: () => {
    dispatch(getOrganizationList());
  },
  changeFilter: (value) => {
    dispatch(changeFilter(value));
  },
});

const mapStateToProps = state => ({
  organizations: state.organizations,
});

export default connect(mapStateToProps, mapDispatchToProps)(MontlyWasteCollection);
