import { Component } from 'react';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  onHadleChange = e => {
    const query = e.target.value.trim();
    this.setState({ searchQuery: query });
  };

  onHandleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);
    this.reset();
  };

  reset = () => this.setState({ searchQuery: '' });

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.onHandleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}></span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
            onChange={this.onHadleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
