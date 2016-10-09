/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import PodcastList from './components/podcast-list.js'

class AnansiMobile extends Component {
  render() {
    return (
      <PodcastList />
    );
  }
}

AppRegistry.registerComponent('AnansiMobile', () => AnansiMobile);
