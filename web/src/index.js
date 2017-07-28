import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// This exposes the core querying/mutation functionality of Apollo.
import ApolloClient, { createNetworkInterface } from 'apollo-client'

// By wrapping React components in this, they can query/mutate the Apollo store.
import { ApolloProvider } from 'react-apollo'

const apolloClient = new ApolloClient({
	networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj5lrcpnd0xid0134bh5dnm2n'})
})

ReactDOM.render((
	// We wrap App in the ApolloProvider even though it's not using it yet.
	<ApolloProvider client={apolloClient}>
		<App />
	</ApolloProvider>
	),
	document.getElementById('root')
);
registerServiceWorker();
