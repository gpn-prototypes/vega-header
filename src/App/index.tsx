import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import { createBrowserHistory } from 'history';

import { App } from './App';

const authToken = localStorage.getItem('auth-token');

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Project: {
        keyFields: ['vid'],
      },
    },
  }),
  link: new HttpLink({
    uri: `${process.env.BASE_API_URL}/graphql`,
    headers: {
      Authorization: authToken ? `Bearer ${authToken}` : undefined,
    },
  }),
});

const identity = {
  logout: () => {
    localStorage.removeItem('auth-token');
  },
};

ReactDOM.render(
  <App history={createBrowserHistory()} graphqlClient={client} identity={identity} />,
  document.getElementById('root'),
);
