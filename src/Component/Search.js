import React, { Component } from 'react';

import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Search.css';

class Search extends Component {
  state = {
    name: ""
  }

  onChange = (event) => {
    this.setState({ name: event.target.value })
  };

  render() {
    let { name } = this.state
    return (
      <div class="wrap">
        <div class="search">
          <Input type="text" class="searchTerm" placeholder='Search Computer' onChange={this.onChange} value={name} />
          <button type="submit" class="searchButton" onClick={this.props.onSearch(name)}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    );
  }
}

export default Search;