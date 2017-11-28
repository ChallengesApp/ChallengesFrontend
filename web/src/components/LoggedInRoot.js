import React from 'react'

class LoggedInRoot extends React.Component {
  render() {
  	return (
  		<div>Logged in!
	  		<button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this._logout}>Logout</button>
  		</div>
	)
  }

  _logout = () => {
  	localStorage.removeItem('graphcoolToken')
	window.location.reload()
  }
}

export default LoggedInRoot;
