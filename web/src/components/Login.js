import React from 'react'
import { graphql } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'

class Login extends React.Component {
  constructor(props) {
    super()

    this.state = {
      email: '',
      password: '',
    }
  }

  render () {
    return (
      <div className='w-100 pa4 flex justify-center'>
        <div style={{ maxWidth: 400 }} className=''>
          <input
            className='w-100 pa3 mv2'
            value={this.state.email}
            placeholder='Email'
            onChange={(e) => this.setState({email: e.target.value})}
          />
          <input
            className='w-100 pa3 mv2'
            type='password'
            value={this.state.password}
            placeholder='Password'
            onChange={(e) => this.setState({password: e.target.value})}
          />

          {this.state.email && this.state.password &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.login}>Login</button>
          }
        </div>
      </div>
    )
  }

  login = async () => {
    const { email, password } = this.state

    try {
      const loginResponse = await this.props.loginUserMutation({
        variables: { email, password }
      })
      localStorage.setItem('graphcoolToken', loginResponse.data.signinUser.token)
      this.props.history.push('/')
    } catch (e) {
      window.confirm('Error: ', e)
      this.props.history.push('/')
    }
  }
}

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    signinUser(email: {
      email: $email,
      password: $password
    }) {
      token
      user {
        id
      }
    }
  }
`

export default 
  graphql(LOGIN_USER, {
    name: 'loginUserMutation'
  })(withRouter(Login))
