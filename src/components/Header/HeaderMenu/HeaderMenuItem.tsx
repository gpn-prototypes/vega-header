import React from 'react';

import { cnHeader } from '../cn-header';

import { useHeaderMenuContext } from './HeaderMenuContext';

type ItemRenderProps = {
  closeMenu?: (e: MouseEvent | TouchEvent | React.SyntheticEvent) => void;
  className: string;
};

type HeaderMenuItemProps = {
  children: (props: ItemRenderProps) => React.ReactNode;
  className?: string;
};

export const HeaderMenuItem: React.FC<HeaderMenuItemProps> = (props) => {
  const { children, className } = props;

  const { closeMenu } = useHeaderMenuContext();

  const content =
    typeof children === 'function'
      ? children({
          closeMenu,
          className: cnHeader('MenuLink').toString(),
        })
      : children;

  return (
    <li className={cnHeader('MenuItem').mix(className).toString()} role="menuitem">
      {content}
    </li>
  );
};
