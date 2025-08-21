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
  }


  goTo = (link) => {
    history.push(link);
    window.location.reload();
  }

  render() {
    const { title, icon, link } = this.props;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className="topbar__link" to="h" onClick={() => this.goTo(link)}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </div>
    );
  }
}


export default TopbarMenuBtn;
