import React from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import gql from 'graphql-tag'

class CreateUser extends React.Component {
  constructor(props) {
    super()

    this.state = {
      email: '',
      password: '',
      name: ''
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
          <input
            className='w-100 pa3 mv2'
            value={this.state.name}
            placeholder='Name'
            onChange={(e) => this.setState({name: e.target.value})}
          />

          {this.state.name && this.state.email && this.state.password &&
          <button className='pa3 bg-black-10 bn dim ttu pointer' onClick={this.createUserAndLogin}>Sign up</button>
          }
        </div>
      </div>
    )
  }

  createUserAndLogin = async () => {
    const { email, password, name } = this.state

    try {
      const createUserResponse = await this.props.signupUserMutation({
        variables: { email, password, name }
      })
      const loginResponse = await this.props.loginUserMutation({
        variables: { email, password }
      })
      window.confirm('Account created!')
      localStorage.setItem('graphcoolToken', loginResponse.data.signinUser.token)
      this.props.history.push('/')
    } catch (e) {
      window.confirm('Error: ', e)
      this.props.history.push('/')
    }
  }
}

const SIGNUP_EMAIL_USER = gql`
  mutation SignupUser($email: String!, $password: String!, $name: String!) {
    createUser(
      authProvider: {
        email: {
          email: $email,
          password: $password
    }}, username: $name) {
      id
    }
  }
`

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

export default compose(
  graphql(SIGNUP_EMAIL_USER, {
    name: 'signupUserMutation'
  }),
  graphql(LOGIN_USER, {
    name: 'loginUserMutation'
  })
  )(withRouter(CreateUser))
