import React, { Component } from 'react';
import {
  ActivityIndicator,
  Alert,
  AppRegistry,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { gql, graphql } from 'react-apollo'

class LoggedOutRoot extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      email: '',
      password: ''
    }
  }

  // Updates the "loading" state, sends the login
  // mutation and displays an alert with the result.
  login() {
    this.setState({ loading: true })
    this.props.mutation_login({
      variables: {
        email: this.state.email,
        password: this.state.password }
    }).then(({data}) => {
      this.setState({ loading: false })
      Alert.alert(
          "Success!",
          `Logged in ${data.signinUser.user.username}. Token: ${data.signinUser.token !== null}`,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
      )
    }).catch((error) => {
      this.setState({ loading: false })
      Alert.alert(
          "Error!",
          `Message: ${error}`,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
      )
    })
  }

  render() {
    return (
      <View>
        <Text
          style={styles.bigCentered}>
          Logged out.
        </Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="next"
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={(event) => { 
            this.refs.PasswordInput.focus(); 
          }}
          onChangeText={(text) => { this.setState({email: text}) }}
        />
        <TextInput
          ref='PasswordInput'
          placeholder="Password"
          secureTextEntry={true}
          returnKeyType="go"
          enablesReturnKeyAutomatically={true}
          onSubmitEditing={(event) => {
            this.login()
          }}
          onChangeText={(text) => { this.setState({password: text}) }}
        />
        
        { this.state.loading ?
          <ActivityIndicator size="large" />
        : <Button
          title="Log in"
          onPress={(event) => {
            this.login()
          }} />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bigCentered: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const loginMutation = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token,
      user {
        username
      }
    }
  }
`

// Bind our login mutation into our component so we can call it as needed.
const LoggedOutRootWithData = graphql(loginMutation, { name: 'mutation_login' })(LoggedOutRoot);

export default LoggedOutRootWithData

AppRegistry.registerComponent('LoggedOutRoot', () => LoggedOutRoot);
