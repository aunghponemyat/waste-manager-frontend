/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logOut } from '../../../../redux/actions/apiActions/AuthActions';

class TopbarMenuLinks extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  render() {
    const { title, icon, dispatch } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className="topbar__link" to="h" onClick={() => dispatch(logOut())}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </div>
    );
  }
}

export default connect()(TopbarMenuLinks);
