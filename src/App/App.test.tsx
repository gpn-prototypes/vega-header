import React from 'react';
import { render } from '@testing-library/react';

import { App } from './App';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(),
})

describe('App', () => {
  test('корректно рендерится', () => {
    render(<App graphqlClient={client} />);
  });
});
