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
      let{name} = this.state
      return (
        <div>
          <Input placeholder='Search Computer' onChange={this.onChange} value={name}/> <FontAwesomeIcon icon={faSearch} onClick={this.props.onSearch(name)} />
        </div>
      );
    }
  }
  
  export default Search;