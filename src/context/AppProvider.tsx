import React from 'react';

import { AppContext } from './AppContext';

type AppProviderProps = {
  children: React.ReactNode;
  identity: unknown;
};

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { children, identity } = props;

  return <AppContext.Provider value={{ identity }}>{children}</AppContext.Provider>;
};
