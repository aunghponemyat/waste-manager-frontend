import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class SelectField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })),
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.string,
        label: PropTypes.string,
      }),
    ]).isRequired,
    styles: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
  };

  static defaultProps = {
    placeholder: '',
    options: [],
    styles: {},
  };

  handleChange = (selectedOption) => {
    const { onChange } = this.props;
    onChange(selectedOption);
  };

  render() {
    const {
      value, name, placeholder, options, styles,
    } = this.props;

    return (
      <Select
        name={name}
        inputId="companyType"
        instanceId="companyType"
        value={value}
        onChange={this.handleChange}
        options={options}
        isClearable={false}
        className="react-select"
        placeholder={placeholder}
        classNamePrefix="react-select"
        styles={styles}
      />
    );
  }
}

const renderSelectField = (props) => {
  const {
    input, meta, options, placeholder,
  } = props;
  const customStyles = {
    placeholder: provided => ({
      ...provided,
      fontFamily: 'Poppins',
    }),
    control: (provided, state) => ({
      ...provided,
      backgroundColor: '#ffffff',
      width: '100%', // match the input field width
      margin: 0,
      borderColor: state.isFocused ? '#00c0d4' : '#3498db',
      boxShadow: state.isFocused ? '0 0 0 1px #00c0d4' : 'none',
      fontFamily: 'Roboto, sans-serif',
      fontSize: 14,
      color: '#333',
      height: 50,
      borderRadius: '10px',
      overflow: 'hidden', // Ensure rounded corners are visible
    }),
    valueContainer: provided => ({
      ...provided,
      height: '50px',
      padding: '0 14px',
      display: 'flex',
      alignItems: 'center',
    }),
    input: provided => ({
      ...provided,
      margin: 0,
      padding: 0,
      lineHeight: '1.5', // Prevent text from expanding height
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
        backgroundColor = '#00c0d4';
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
    <div className="form-group">
      <SelectField
        {...input}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
      />
      {meta.touched && meta.error && <span className="text-danger">{meta.error}</span>}
    </div>
  );
};

renderSelectField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  placeholder: PropTypes.string,
};

renderSelectField.defaultProps = {
  meta: null,
  options: [],
  placeholder: '',
};

export default renderSelectField;
