import { createContext, useContext } from 'react';

type HeaderMenuContextProps = {
  closeMenu?: (e: MouseEvent | TouchEvent | React.SyntheticEvent) => void;
};

export const HeaderMenuContext = createContext<HeaderMenuContextProps>({});

export const useHeaderMenuContext = (): HeaderMenuContextProps => useContext(HeaderMenuContext);
