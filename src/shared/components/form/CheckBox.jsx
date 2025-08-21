import React, { PureComponent } from 'react';
import CheckIcon from 'mdi-react/CheckIcon';
import CloseIcon from 'mdi-react/CloseIcon';
import PropTypes from 'prop-types';
import classNames from 'classnames';


class CheckBoxField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]).isRequired,
    label: PropTypes.string,
    defaultChecked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    color: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    meta: PropTypes.object,
  };

  static defaultProps = {
    label: '',
    defaultChecked: false,
    disabled: false,
    className: '',
    color: '',
    meta: {},
  };

  componentDidMount() {
    this.props.onChange(this.props.defaultChecked);
  }

  render() {
    const {
      disabled, className, name, value, onChange, label, color, meta: { touched, error, warning },
    } = this.props;
    const CheckboxClass = classNames({
      'checkbox-btn': true,
      disabled,
    });

    return (
      <div>
        <label
          className={`${CheckboxClass} ${className ? ` checkbox-btn--${className}` : ''}`}
          htmlFor={name}
        >
          <input
            className="checkbox-btn__checkbox"
            type="checkbox"
            id={name}
            name={name}
            onChange={onChange}
            checked={value}
            disabled={disabled}
          />
          <span
            className="checkbox-btn__checkbox-custom"
            style={color ? { background: color, borderColor: color } : {}}
          >
            <CheckIcon />
          </span>
          {className === 'button' ?
            <span className="checkbox-btn__label-svg">
              <CheckIcon className="checkbox-btn__label-check" />
              <CloseIcon className="checkbox-btn__label-uncheck" />
            </span> : ''}
          <span className="checkbox-btn__label">
            {label}
          </span>
        </label>
        {touched && ((error && <span className="text-danger">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    );
  }
}

const renderCheckBoxField = props => (
  <CheckBoxField
    {...props.input}
    label={props.label}
    defaultChecked={props.defaultChecked}
    disabled={props.disabled}
    className={props.className}
    color={props.color}
    meta={props.meta}
  />
);

renderCheckBoxField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }).isRequired,
  label: PropTypes.string,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  color: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  meta: PropTypes.object,
};

renderCheckBoxField.defaultProps = {
  label: '',
  defaultChecked: false,
  disabled: false,
  className: '',
  color: '',
  meta: {},
};

export default renderCheckBoxField;
