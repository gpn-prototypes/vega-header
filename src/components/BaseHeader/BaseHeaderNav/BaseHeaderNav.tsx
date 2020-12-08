import React from 'react';
import { Tabs } from '@consta/uikit/Tabs';

import { cnBaseHeader } from '../cn-base-header';
import { NavItemType } from '../types';

type BaseHeaderNavProps = {
  navItems: NavItemType[];
  activeItem?: NavItemType;
  onChangeItem: (item: NavItemType) => void;
};

export const BaseHeaderNav: React.FC<BaseHeaderNavProps> = (props) => {
  const { navItems, activeItem, onChangeItem } = props;

  const handleChangeItem = (item: NavItemType | null): void => {
    if (item !== null) {
      onChangeItem(item);
    }
  };

  return (
    <nav aria-label="Навигация шапки" className={cnBaseHeader('Nav')}>
      <Tabs<NavItemType>
        view="clear"
        size="s"
        items={navItems}
        value={activeItem}
        getLabel={(item): string => item.name}
        onChange={({ value }): void => handleChangeItem(value)}
      />
    </nav>
  );
};
