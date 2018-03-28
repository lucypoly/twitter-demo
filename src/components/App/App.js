import React, { Component } from 'react';
import { Tweet } from 'react-twitter-widgets'
import './App.scss';

class App extends Component {
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
      <div className="App">
        <label>
          <i className="fa fa-search"
            aria-hidden="true"
            onClick={this.handleClick}> </i>
          <input type="text"
            value={this.state.tag}
            onChange={this.handleChange} />
        </label>
        {/*<Tweet tweetId='978252949188169729'></Tweet>*/}
      </div>
    );
  }
}

export default App;
