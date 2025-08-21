/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import history from '../../../../shared/utils/history';

class TopbarMenuBtn extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'topbar__link',
  };

  goTo = (link) => {
    history.push(link);
    window.location.reload();
  }

  render() {
    const { title, icon, link, className } = this.props;

    return (
      <button className={className} onClick={() => this.goTo(link)}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </button>
    );
  }
}

export default TopbarMenuBtn;

