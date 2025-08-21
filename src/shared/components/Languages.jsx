import React, { PureComponent, createRef } from 'react';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'my', label: 'Burmese' },
  { code: 'kr', label: 'Korean' },
  { code: 'th', label: 'Thai' },
  { code: 'vn', label: 'Vietnamese' },
  // Add more languages here
];

class LanguageDropdown extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selected: languages[0],
    };
    this.dropdownRef = createRef();
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (this.dropdownRef.current && !this.dropdownRef.current.contains(event.target)) {
      this.setState({ open: false });
    }
  };

  toggleOpen = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  handleSelect = (lang) => {
    this.setState({ selected: lang, open: false });
    // Optionally: trigger a callback or redux action here
  };

  render() {
    const { open, selected } = this.state;

    return (
      <div className="language-dropdown" ref={this.dropdownRef}>
        <button
          className="language-dropdown__button"
          onClick={this.toggleOpen}
          aria-haspopup="listbox"
          aria-expanded={open}
          type="button"
        >
          {selected.label}
          <ChevronDownIcon style={{ marginLeft: 8 }} />
        </button>
        {open && (
          <ul className="language-dropdown__list" role="listbox">
            {languages.map(lang => (
              <li
                key={lang.code}
                className={`language-dropdown__item${lang.code === selected.code ? ' selected' : ''}`}
                onClick={() => this.handleSelect(lang)}
                role="option"
                aria-selected={lang.code === selected.code}
              >
                {lang.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

export default LanguageDropdown;
