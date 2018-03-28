import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tweet } from 'react-twitter-widgets';

import './App.css';
import Search from '../Search/Search';

import { getTimelines } from '../../actions';


class App extends Component {

  render() {
    return (
      <div className="App">
        <Search getTimelines={this.props.getTimelinesAction} />
        {/*<Tweet tweetId='978252949188169729'></Tweet>*/}
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    timelines: { ...state.timelines },
  }
);

export default connect(mapStateToProps, {
  getTimelinesAction: getTimelines
})(App);











