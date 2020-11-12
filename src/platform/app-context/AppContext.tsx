import { createContext, useContext } from 'react';

import { Identity } from './type';

type AppContextType = {
  identity: Identity;
};

export const AppContext = createContext<AppContextType>({
  identity: {
    logout: () => {},
  },
});

export const useAppContext = (): AppContextType => useContext(AppContext);
