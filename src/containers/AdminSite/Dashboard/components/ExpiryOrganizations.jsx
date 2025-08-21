/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Panel from '../../../../shared/components/Panel';
import { getContractExpries } from '../../../../redux/actions/apiActions/miscActions';

class ContractExpries extends PureComponent {
  componentWillMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getContractExpries();
  }

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const { contractExpries } = this.props.misc;
    return (
      <Panel lg={6} xl={4} md={3} xs={3} title="Contract Expiries" style={{ maxHeight: 500 }}>
        {/* {JSON.stringify(contractExpries)} */}
        <div style={{ maxHeight: 300, overflowY: 'scroll', overflowX: 'hidden' }}>
          {contractExpries
            && contractExpries.map(prop => (
              <div className="dashboard__competitor">
                <div className="dashboard__competitor-info">
                  <p className="dashboard__competitor-name">{prop.name}</p>
                  <p
                    className={
                      new Date(prop.expiredDate) < new Date()
                        ? 'dashboard__competitor-result-red'
                        : 'dashboard__competitor-result-green'}
                  >
                    {new Date(prop.expiredDate).toDateString()}
                  </p>
                  <div className="dashboard__divider" />
                </div>
              </div>
            ))
          }
        </div>
      </Panel>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getContractExpries: () => {
    dispatch(getContractExpries());
  },
});

const mapStateToProps = state => ({
  misc: state.misc,
});

export default connect(mapStateToProps, mapDispatchToProps)(ContractExpries);
