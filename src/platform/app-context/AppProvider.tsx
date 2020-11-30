import React from 'react';
import { Identity } from '@gpn-prototypes/vega-sdk';

import { AppContext } from './AppContext';

type AppProviderProps = {
  children: React.ReactNode;
  identity: Identity;
};

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { children, identity } = props;

  return <AppContext.Provider value={{ identity }}>{children}</AppContext.Provider>;
};
