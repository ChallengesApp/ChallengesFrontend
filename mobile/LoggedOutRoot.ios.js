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
import { reduxForm, Field } from 'redux-form'

class LoggedOutRoot extends React.Component {
  pretendLogin() {
    Alert.alert(
      'Pretend Login!',
      'Now we need to send the login request with (email) and (password).',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  render() {
    if (this.props.data.loading) {
      return <Text style={styles.bigCentered}>Logged out. Loading…</Text>
    }

    if (this.props.data.error) {
      return <Text style={styles.bigCentered}>Logged out. Error!</Text>
    }

    return (
      <View>
        <Text style={styles.bigCentered}>Logged out. Server says: {this.props.data.TestObject.testField}</Text>
        <TextInput
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        enablesReturnKeyAutomatically={true}
        onSubmitEditing={(event) => { 
          this.refs.PasswordInput.focus(); 
        }} />
        <TextInput
        ref='PasswordInput'
        placeholder="Password"
        secureTextEntry={true}
        returnKeyType="go"
        enablesReturnKeyAutomatically={true}
        onSubmitEditing={(event) => {
          this.pretendLogin()
        }} />
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
const TestObjectQuery = gql`{
    TestObject(id: "cj5lrdzvm8yh90191zz4w72gv") {
      testField
    }
}`

// The `graphql()` function is provided by Apollo. It is available
// here because we've wrapped our LoggedOutRootWithData in an ApolloProvider.
const LoggedOutRootWithData = graphql(TestObjectQuery)(LoggedOutRoot);

export default LoggedOutRootWithData

AppRegistry.registerComponent('LoggedOutRoot', () => LoggedOutRoot);
