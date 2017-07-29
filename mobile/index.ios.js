/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { NativeRouter as Router, Route } from 'react-router-native';
import TestComponent from './TestComponent.ios.js'

// This exposes the core querying/mutation functionality of Apollo.
import ApolloClient, { createNetworkInterface } from 'apollo-client'

// By wrapping React components in this, they can query/mutate the Apollo store.
import { ApolloProvider } from 'react-apollo'

const apolloClient = new ApolloClient({
	networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj5lrcpnd0xid0134bh5dnm2n'})
})

export default class mobile extends Component {
  render() {
    return (
    	<ApolloProvider client={apolloClient}>
	      <Router>
	        <Route path="/" component={TestComponent} />
	      </Router>
	      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('mobile', () => mobile);
