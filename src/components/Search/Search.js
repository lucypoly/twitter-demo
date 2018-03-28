import React, { Component } from 'react';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: '',
    };
  }

  fetchTag(tag) {
    fetch(`/search/${tag}`)
      .then(res => res.json())
      .then(data => console.log(data));
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
      <label>
        <input type="text"
          value={this.state.tag}
          onChange={this.handleChange} />
        <i className="fa fa-search"
          aria-hidden="true"
          onClick={this.handleClick}> </i>
      </label>
    );
  }
}

export default Search;
