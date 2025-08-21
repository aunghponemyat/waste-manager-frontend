import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import { Button } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import Select from 'react-select';
import { connect } from 'react-redux';
import { getLogisticsByOrganization } from '../../../../redux/actions/apiActions/logisticsActions';

class CreateQuarterModal extends React.PureComponent {
  static propTypes = {
    organization: PropTypes.string.isRequired,
    getLogisticsByOrganization: PropTypes.func.isRequired,
    logistics: PropTypes.arrayOf(PropTypes.object).isRequired,
    createQuarter: PropTypes.func.isRequired,
  };

  state = {
    quarter: null,
    ways: [],
  }

  componentWillMount() {
    this.props.getLogisticsByOrganization(this.props.organization);
  }

  handleSubmit = () => {
    this.props.createQuarter({
      quarter: this.state.quarter.value,
      ways: this.state.ways,
    });
    this.setState({
      quarter: null,
      ways: [],
    });
  }

  handleQuarterChange = (value) => {
    this.setState({
      quarter: value,
    });
  }

  handleWaysChange = (value) => {
    this.setState({
      ways: value,
    });
  }


  render() {
    const { quarter, ways } = this.state;
    const {
      logistics,
    } = this.props;

    return (
      <div className="modal__body">
        <form className="form form--horizontal">
          <div className="form__form-group">
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
          </div>

          <div className="form__form-group">
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
          </div>
          <Button className="icon" color="success" onClick={() => this.handleSubmit()}>
            <p>
              <FaPlus /> Create Quarter
            </p>
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getLogisticsByOrganization: (organizationId) => {
    dispatch(getLogisticsByOrganization(organizationId));
  },
});

const mapStateToProps = state => ({
  logistics: state.logistics,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQuarterModal);
