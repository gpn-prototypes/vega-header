import React from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Identity } from '@gpn-prototypes/vega-sdk';
import { render } from '@testing-library/react';
import { createBrowserHistory } from 'history';

import { App } from './App';

const client = new ApolloClient({
  cache: new InMemoryCache(),
});

describe('App', () => {
  test('корректно рендерится', () => {
    render(
      <App
        history={createBrowserHistory()}
        graphqlClient={client}
        identity={new Identity({ apiUrl: '/' })}
      />,
    );
  });
});
