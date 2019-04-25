import React, { Component } from 'react';

import { Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import './Search.scss';

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
      <div className="wrap">
        <div className="search">
          <Input type="text" className="searchTerm" placeholder='Search Computer' onChange={this.onChange} value={name} />
          <button type="submit" className="searchButton" onClick={this.props.onSearch(name,this.props.page.limit,this.props.page.page)}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    );
  }
}

export default Search;
