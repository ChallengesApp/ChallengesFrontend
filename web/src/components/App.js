import React from 'react'
import LoggedInRoot from './LoggedInRoot'
import LoggedOutRoot from './LoggedOutRoot'

class App extends React.Component {
  render() {
	const token = localStorage.getItem('graphcoolToken')
	if (token) {
		return <LoggedInRoot/>
	} else {
		return <LoggedOutRoot/>
	}
  }
}

export default App;
