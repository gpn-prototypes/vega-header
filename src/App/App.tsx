import React, { ReactElement } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { Root as VegaRoot } from '@gpn-prototypes/vega-ui';

import { Header } from '../components/Header';
import { AppProvider } from '../context';

type AppProps = {
  graphqlClient: ApolloClient<NormalizedCacheObject>;
  identity?: unknown;
};

export const App = (props: AppProps): ReactElement => {
  const { graphqlClient, identity } = props;
  return (
    <ApolloProvider client={graphqlClient}>
      <AppProvider identity={identity}>
        <BrowserRouter basename="/projects">
          <Route
            path={['/show/:projectId', '/edit/:projectId', '/show/:projectId/rb', '/', '/create']}
          >
            <VegaRoot defaultTheme="dark">
              <Header />
            </VegaRoot>
          </Route>
        </BrowserRouter>
      </AppProvider>
    </ApolloProvider>
  );
};
