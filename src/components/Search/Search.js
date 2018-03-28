import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
    };
  }

  fetchTag(tag) {
    this.props.getTimelines(tag);
  }

  handleChange = (event) => {
    const tag = event.target.value;
    this.setState({ tag: tag });
  };

  handleClick = () => {
    const tag = this.state.tag;
    this.fetchTag(tag);
  };

  render() {
    return (
      <div className="container">
        <span className="anchor">#</span>
        <input type="text"
          value={this.state.tag}
          onChange={this.handleChange}
          className="search" />
        <i className="fa fa-search"
          aria-hidden="true"
          onClick={this.handleClick}> </i>
      </div>
    );
  }
}

export default Search;
