import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { Identity } from '@gpn-prototypes/vega-sdk';
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

const identity = new Identity({ apiUrl: '/' });

ReactDOM.render(
  <App history={createBrowserHistory()} graphqlClient={client} identity={identity} />,
  document.getElementById('root'),
);
