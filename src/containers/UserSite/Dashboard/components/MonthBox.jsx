/* eslint-disable no-underscore-dangle */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MonthBox extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  constructor(props, context) {
    super(props, context);

    this.state = {
      value: this.props.value || 'N/A',
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      value: props.value || 'N/A',
    };
  }

  _handleClick = (e) => {
    // eslint-disable-next-line no-unused-expressions
    this.props.onClick && this.props.onClick(e);
  }

  render() {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div className="month-box" onClick={this._handleClick}>
        <p>{this.state.value}</p>
      </div>
    );
  }
}
