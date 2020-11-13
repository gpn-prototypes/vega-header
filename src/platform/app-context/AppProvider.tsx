import React from 'react';

import { AppContext } from './AppContext';
import { Identity } from './type';

type AppProviderProps = {
  children: React.ReactNode;
  identity: Identity;
};

export const AppProvider: React.FC<AppProviderProps> = (props) => {
  const { children, identity } = props;

  return <AppContext.Provider value={{ identity }}>{children}</AppContext.Provider>;
};
