/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { Button } from 'reactstrap';
import TopbarMenuBtn from './TopbarMenuBtn';
import { logOut } from '../../../../redux/actions/apiActions/AuthActions';
// import history from '../../../../shared/utils/history';

class TopbarMenuLinks extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { dispatch } = this.props;
    // const goToSetting = () => {
    //   history.push('/settings');
    //   window.location.reload();
    // };

    return (
      // <Button className="topbar__link icon">
      //   {/* <span className={`topbar__link-icon lnr lnr-${icon}`} />
      //   {icon}
      //   {title} */}
      //   <p style={{ display: 'inlinBlock' }}><span
      //     className={`lnr lnr-${icon}`}
      //     style={{ color: '#00c0d4', cursor: 'pointer' }}
      //   />
      //     {title}
      //   </p>
      // </Button>
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div>
        {/* <div className="topbar__link" onClick={() => goToSetting()}>
          <span className="topbar__link-icon lnr lnr-cog" />
          <p className="topbar__link-title">Account</p>
        </div> */}
        <TopbarMenuBtn title="Change Password" icon="pencil" link="/change_password" />
        <div className="topbar__link" to="h" onClick={() => dispatch(logOut())} >
          <span className="topbar__link-icon lnr lnr-exit" />
          <p className="topbar__link-title">Log Out</p>
        </div>
      </div>
    );
  }
}

export default connect()(TopbarMenuLinks);
