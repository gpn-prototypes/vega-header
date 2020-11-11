import { createContext, useContext } from 'react';

type AppContextType = {
  identity: unknown;
};

export const AppContext = createContext<AppContextType>({
  identity: () => {},
});

export const useAppContext = (): AppContextType => useContext(AppContext);
