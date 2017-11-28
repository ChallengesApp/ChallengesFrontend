import React from 'react'
import LoggedInRoot from './LoggedInRoot'
import LoggedOutRoot from './LoggedOutRoot'

class App extends React.Component {
  render() {
	const token = localStorage.getItem('userToken')
	const userID = localStorage.getItem('userID')
	if (token && userID) {
		return <LoggedInRoot userID={userID}/>
	} else {
		return <LoggedOutRoot/>
	}
  }
}

export default App;
