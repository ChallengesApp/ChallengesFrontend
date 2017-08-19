import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import { NativeRouter as Router, Route } from 'react-router-native';
import LoggedOutRoot from './LoggedOutRoot.ios.js'

// This exposes the core querying/mutation functionality of Apollo.
import ApolloClient, { createNetworkInterface } from 'apollo-client'

// By wrapping React components in this, they can query/mutate the Apollo store.
import { ApolloProvider } from 'react-apollo'

const apolloClient = new ApolloClient({
	networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj5h0vrp9ug5d0122fw1yudoh'})
})

export default class mobile extends Component {
  render() {
    return (
    	<ApolloProvider client={apolloClient}>
	      <Router>
	        <Route path="/" component={LoggedOutRoot} />
	      </Router>
	      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('mobile', () => mobile);
