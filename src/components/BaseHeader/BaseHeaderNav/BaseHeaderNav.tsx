import React from 'react';
import { cnTabsTab, Tabs } from '@consta/uikit/Tabs';

import { cnBaseHeader } from '../cn-base-header';
import { NavItemType } from '../types';

type BaseHeaderNavProps = {
  navItems: NavItemType[];
  activeItem?: NavItemType;
  onChangeItem: (item: NavItemType) => void;
};

const testId = {
  nav: 'BaseHeader:Nav',
} as const;

type BaseHeaderNavType = React.FC<BaseHeaderNavProps> & {
  testId: typeof testId;
};

export const BaseHeaderNav: BaseHeaderNavType = (props) => {
  const { navItems, activeItem, onChangeItem } = props;

  const handleChangeItem = (item: NavItemType | null): void => {
    if (item !== null) {
      onChangeItem(item);
    }
  };

  return (
    <nav aria-label="Навигация шапки" className={cnBaseHeader('Nav')} data-testid={testId.nav}>
      <Tabs<NavItemType>
        view="clear"
        size="s"
        items={navItems}
        value={activeItem}
        getLabel={(item): string => item.name}
        onChange={({ value }): void => handleChangeItem(value)}
        renderItem={({ key, ref, onChange, label, item, className }) => (
          <button
            role="tab"
            key={key}
            ref={ref}
            type="button"
            onClick={onChange}
            className={cnTabsTab({ checked: item.name === activeItem?.name }, [className])}
            data-testid={item.testId}
          >
            {label}
          </button>
        )}
      />
    </nav>
  );
};

BaseHeaderNav.testId = testId;
