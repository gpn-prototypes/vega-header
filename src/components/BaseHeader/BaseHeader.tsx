import React from 'react';

import { cnBaseHeader } from './cn-base-header';
import { BaseHeaderMenu } from './BaseHeaderMenu';
import { BaseHeaderNav } from './BaseHeaderNav';

import './BaseHeader.css';

type BaseHeaderProps = {
  className?: string;
  children: React.ReactNode;
};

type BaseHeaderType = React.FC<BaseHeaderProps> & {
  Menu: typeof BaseHeaderMenu;
  Nav: typeof BaseHeaderNav;
};

export const BaseHeader: BaseHeaderType = ({ className, children }) => {
  const cn = cnBaseHeader.mix(className);

  return <BaseHeader className={cn}>{children}</BaseHeader>;
};

BaseHeader.Menu = BaseHeaderMenu;
BaseHeader.Nav = BaseHeaderNav;
