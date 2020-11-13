import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

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
    uri: 'http://outsourcing.nat.tepkom.ru:38080/graphql',
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
  <App graphqlClient={client} identity={identity} />,
  document.getElementById('root'),
);
