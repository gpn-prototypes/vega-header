import React, { ReactElement } from 'react';
import { Route, Router } from 'react-router-dom';
import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { Root as VegaRoot } from '@gpn-prototypes/vega-ui';
import { History } from 'history';

import { Header } from '../components/Header';
import { AppProvider } from '../platform/app-context/AppProvider';
import { Identity } from '../platform/app-context/type';

type AppProps = {
  graphqlClient: ApolloClient<NormalizedCacheObject>;
  identity: Identity;
  history: History;
};

export const App = (props: AppProps): ReactElement => {
  const { graphqlClient, identity, history } = props;
  return (
    <ApolloProvider client={graphqlClient}>
      <AppProvider identity={identity}>
        <Router history={history}>
          <Route
            path={[
              '/projects/show/:projectId',
              '/projects/show/:projectId/rb',
              '/projects',
              '/projects/create',
            ]}
          >
            <VegaRoot defaultTheme="dark">
              <Header />
            </VegaRoot>
          </Route>
        </Router>
      </AppProvider>
    </ApolloProvider>
  );
};
