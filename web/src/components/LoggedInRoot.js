import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class LoggedInRoot extends React.Component {
  render() {
  	if (this.props.loggedInUserQuery.loading) {
		return <div>Loading…</div>
	}

  	return (
  		<div>Logged in as {this.props.loggedInUserQuery.User.username}
	  		<button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this._logout}>Logout</button>
  		</div>
	)
  }

  _logout = () => {
  	localStorage.removeItem('userToken')
  	localStorage.removeItem('userID')
	window.location.reload()
  }
}

const LoggedInRootQuery = gql`
    query User($userID: ID) {
    	User(id: $userID) {
    		username
    	}
    }
`

export default graphql(LoggedInRootQuery, {
	name: 'loggedInUserQuery',
	options: ({ userID }) => ({ variables: { userID } })
})(LoggedInRoot);
