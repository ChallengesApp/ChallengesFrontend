import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import TestComponent from './TestComponent.js';

// This exposes the core querying/mutation functionality of Apollo.
import ApolloClient, { createNetworkInterface } from 'apollo-client'

// By wrapping React components in this, they can query/mutate the Apollo store.
import { ApolloProvider } from 'react-apollo'

const apolloClient = new ApolloClient({
	networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj5lrcpnd0xid0134bh5dnm2n'})
})

// The root render call.
ReactDOM.render((
	// Wrap the entire page in ApolloProvider, handles loading/caching/vending data.
	<ApolloProvider client={apolloClient}>
		<BrowserRouter>
			<Route path="/" component={TestComponent}/>
		</BrowserRouter>
	</ApolloProvider>
	),
	document.getElementById('root')
);
registerServiceWorker();
