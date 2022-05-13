import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

// Initialize Apollo Client
const link = new createHttpLink({uri: 'http://localhost:4000/'});
const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <AppNavigator />
  </ApolloProvider>
);

export default App;
