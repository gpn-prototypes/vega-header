import { createContext, useContext } from 'react';
import { Identity } from '@gpn-prototypes/vega-sdk';

type AppContextType = {
  identity: Identity;
};

export const AppContext = createContext<AppContextType>({
  identity: new Identity({ apiUrl: '/api' }),
});

export const useAppContext = (): AppContextType => useContext(AppContext);
