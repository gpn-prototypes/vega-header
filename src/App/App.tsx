import React, { ReactElement } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { Root as VegaRoot } from '@gpn-prototypes/vega-ui';

import { Header } from '../components/Header';

type AppProps = {
  graphqlClient: ApolloClient<NormalizedCacheObject>;
};

export const App = (props: AppProps): ReactElement => {
  const { graphqlClient } = props;
  return (
    <ApolloProvider client={graphqlClient}>
      <BrowserRouter basename="/projects">
        <Route
          path={['/show/:projectId', '/edit/:projectId', '/show/:projectId/rb', '/', '/create']}
        >
          <VegaRoot defaultTheme="dark">
            <Header />
          </VegaRoot>
        </Route>
      </BrowserRouter>
    </ApolloProvider>
  );
};
