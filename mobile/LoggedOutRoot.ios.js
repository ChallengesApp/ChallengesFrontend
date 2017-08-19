import React, { Component } from 'react';
import {
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
      email:'',
      password:''
    }
  }

  pretendLogin() {
    this.props.mutate({
      variables: {
        email: this.state.email,
        password: this.state.password }
    }).then(({data}) => {
      Alert.alert(
          "Success!",
          `Logged in ${data.signinUser.user.username}. Token: ${data.signinUser.token !== null}`,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
      )
    }).catch((error) => {
      Alert.alert(
          "Error!",
          `Message: ${error}`,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]
      )
    });
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
            this.pretendLogin()
          }}
          onChangeText={(text) => { this.setState({password: text}) }}
        />
        <Button
          title="Log in"
          onPress={(event) => {
            this.pretendLogin()
        }} />
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
const login = gql`
  mutation signinUser($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token,
      user {
        username
      }
    }
  }
`

// The `graphql()` function is provided by Apollo. It is available
// here because we've wrapped our LoggedOutRootWithData in an ApolloProvider.
const LoggedOutRootWithData = graphql(login)(LoggedOutRoot);

export default LoggedOutRootWithData

AppRegistry.registerComponent('LoggedOutRoot', () => LoggedOutRoot);
