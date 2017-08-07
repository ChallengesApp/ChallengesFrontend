import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { gql, graphql } from 'react-apollo'

class TestComponent extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <Text style={styles.bigCentered}>Loading…</Text>
    }

    if (this.props.data.error) {
      return <Text style={styles.bigCentered}>Error!</Text>
    }

    return (
      <Text style={styles.bigCentered}>Got from server: {this.props.data.TestObject.testField}</Text>
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
// here because we've wrapped our TestComponentWithData in an ApolloProvider.
const TestComponentWithData = graphql(TestObjectQuery)(TestComponent);

export default TestComponentWithData

AppRegistry.registerComponent('TestComponent', () => TestComponent);
