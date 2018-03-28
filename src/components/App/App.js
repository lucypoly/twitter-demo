import React, { Component } from 'react';
import { Tweet } from 'react-twitter-widgets'
import './App.scss';
import Search from '../Search/Search';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Search />
        {/*<Tweet tweetId='978252949188169729'></Tweet>*/}
      </div>
    );
  }
}

export default App;
