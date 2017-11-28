import React from 'react'

class LoggedOutRoot extends React.Component {
  render() {
    return (
      <div>Logged out. <a href='./login'>Login?</a> <a href='./signup'>Signup?</a></div>
    )
  }
}

export default LoggedOutRoot;
