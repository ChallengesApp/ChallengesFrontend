import React from 'react';
import { gql, graphql } from 'react-apollo'

/**
 * In this file we're just testing the Apollo stack.
 * We attempt to query a known "TestObject" from the server,
 * and read its "testField" which we have set to "Hello world!"
 *
 * We should see "Hello world!" show up onscreen.
 */

class TestComponent extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <div>Loading…</div>
    }

    if (this.props.data.error) {
      return <div>Error!</div>
    }

    return (
      <div>Got from server: {this.props.data.TestObject.testField}</div>
    )
  }
 }

const TestObjectQuery = gql`{
    TestObject(id: "cj5lrdzvm8yh90191zz4w72gv") {
      testField
    }
}`

// The `graphql()` function is provided by Apollo. It is available
// here because we've wrapped our TestComponentWithData in an ApolloProvider.
const TestComponentWithData = graphql(TestObjectQuery)(TestComponent);

export default TestComponentWithData
