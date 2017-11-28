import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CreateUser from './components/CreateUser.js'
import App from './components/App.js'
import Login from './components/Login.js'

// This exposes the core querying/mutation functionality of Apollo.
import ApolloClient from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink} from 'apollo-link'

// By wrapping React components in this, they can query/mutate the Apollo store.
import { ApolloProvider } from 'react-apollo'

// Plain link, with no auth
const httpLink = createHttpLink({ uri: 'https://api.graph.cool/simple/v1/cj5h0vrp9ug5d0122fw1yudoh' })

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('graphcoolToken')
  const authorizationHeader = token ? `Bearer ${token}` : null
  operation.setContext({
    headers: {
      authorization: authorizationHeader
    }
  })
  return forward(operation)
})

const httpLinkWithAuthToken = middlewareLink.concat(httpLink)

const apolloClient = new ApolloClient({
	link: httpLinkWithAuthToken,
	cache: new InMemoryCache()
})

// The root render call.
ReactDOM.render((
	// Wrap the entire page in ApolloProvider, handles loading/caching/vending data.
	<ApolloProvider client={apolloClient}>
		<BrowserRouter>
			<Switch>
				<Route exact path='/' component={App} />
				<Route path='/signup' component={CreateUser}/>
				<Route path='/login' component={Login}/>
			</Switch>
		</BrowserRouter>
	</ApolloProvider>
	),
	document.getElementById('root')
);
