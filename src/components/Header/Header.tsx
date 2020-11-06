import React from 'react';

import { cnHeader } from './cn-header';
import { HeaderMenu } from './HeaderMenu';
import { HeaderNav } from './HeaderNav';

import './Header.css';

type HeaderProps = {
  className?: string;
  children: React.ReactNode;
};

type HeaderType = React.FC<HeaderProps> & {
  Menu: typeof HeaderMenu;
  Nav: typeof HeaderNav;
};

export const Header: HeaderType = ({ className, children }) => {
  const cn = cnHeader.mix(className);

  return <header className={cn}>{children}</header>;
};

Header.Menu = HeaderMenu;
Header.Nav = HeaderNav;
