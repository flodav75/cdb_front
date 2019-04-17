import React, { Component } from 'react';

import {Input} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends Component {
    state = {
        name: ""
    }

    onChange = (event) => {
        this.setState({ name: event.target.value })
    };

    render() {
      return (
          <div>
        <Input placeholder='Search Computer' onChange={this.onChange} value={this.state.name}/>
        <FontAwesomeIcon icon={faSearch} onClick={this.props.onSearch(this.state.name)} />
        </div>
      );
    }
  }
  
  export default Search;