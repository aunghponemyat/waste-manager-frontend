import React, { PureComponent } from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import '../../scss/component/badge.scss';

export default class BadgeColor extends PureComponent {
  static propTypes = {
    status: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    status: '',
    children: null,
  };

  render() {
    const { status, children } = this.props;
    return <Badge className={`badge badge--${status.toLowerCase()}`}>{children}</Badge>;
  }
}
