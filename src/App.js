import React, {Component} from 'react';
import {Tweet} from 'react-twitter-widgets'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Tweet tweetId='978252949188169729'></Tweet>
      </div>
    );
  }
}

export default App;
