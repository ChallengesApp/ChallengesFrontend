import React from 'react';
import { gql, graphql } from 'react-apollo'

/**
 * In this file we're just testing the Apollo stack.
 * We attempt to query a known "TestObject" from the server,
 * and read its "testField" which we have set to "Hello world!"
 *
 * We should see "Hello world!" show up onscreen.
 * This is very ugly but we're taking baby steps.
 */

// The `graphql()` function is provided by Apollo. It is available
// here because we've wrapped our TestComponentWithData in an ApolloProvider.
const TestComponentWithData = graphql(gql`{
    TestObject(id: "cj5lrdzvm8yh90191zz4w72gv") {
      testField
    }
}`)(TestComponent);

// This function is what we pass into Apollo's graphql function above
// to render the Apollo data into a React component.
function TestComponent({ data }) {
  if (data.loading) {
    return <div>Loading…</div>
  }

  if (data.error) {
    return <div>Error. Data: {JSON.stringify(data)}</div>
  }

  return (
    <div>Got from server: {data.TestObject.testField}</div>
  )
}

export default TestComponentWithData;
