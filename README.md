# Challenges App

Web, iOS, Android frontends for the Challenges App.

## Tech

- [React](https://facebook.github.io/react/) for UI logic.
  - We use React 16 Beta. React 16 is much faster than previous verisons. [Comparison](https://claudiopro.github.io/react-fiber-vs-stack-demo/).
- [ReactDOM](https://facebook.github.io/react/docs/react-dom.html) for UI rendering on web.
  - We use ReactDOM 16 Beta.
- [React Native](http://facebook.github.io/react-native/) for UI rendering on iOS and Android.
- [Redux](http://redux.js.org) for state management. This is a further abstraction on top of React that reduces complexity by centralizing state rather than letting you fiddle with it at random.
- [Apollo](http://dev.apollodata.com) for data fetching and caching.

Apollo reads data from our GraphQL backend and stores it in Redux stores, which we read and render into React components, which are sent to ReactDOM (browser) or React Native to be displayed.
