import React, { useMemo } from 'react';
import { Link, matchPath } from 'react-router-dom';
import { Badge, Loader, Text } from '@gpn-prototypes/vega-ui';
import cn from 'bem-cn';

import { useAppContext } from '../../platform/app-context/AppContext';
import { BaseHeader } from '../BaseHeader';

import { NavLinkType } from './types';

type HeaderViewProps = {
  projectName?: string | null;
  isProjectPage: boolean | null;
  isCreateProjectPage: boolean | null;
  isLoading?: boolean;
  onChangeActive: (item: NavLinkType) => void;
  pathname: string;
};

const cnHeader = cn('Header');

export const HeaderView = (props: HeaderViewProps): React.ReactElement => {
  const {
    projectName,
    onChangeActive,
    isCreateProjectPage,
    isLoading,
    isProjectPage,
    pathname,
  } = props;
  const { identity } = useAppContext();

  const navItems: NavLinkType[] = [
    { name: 'О проекте', url: '/show/:projectId' },
    { name: 'Ресурсная база', url: '/show/:projectId/rb' },
    { name: 'Логика проекта', url: '/show/:projectId/lc' },
  ];

  const isActiveNavItem = useMemo(() => {
    return navItems.find((item) => {
      const match = matchPath(pathname, {
        path: item.url,
        exact: true,
      });

      return match !== null;
    });
  }, [pathname, navItems]);

  const menuItems = [
    { name: 'Проекты', url: '/' },
    { name: 'Обучение', disabled: true },
    { name: 'Помощь', disabled: true },
  ];

  const handleChangeActive = (item: NavLinkType): void => {
    onChangeActive(item);
  };

  const title = (): string | null | undefined => {
    if (isCreateProjectPage) {
      return 'Создание проекта';
    }

    if (isProjectPage) {
      return 'Проекты';
    }

    return projectName;
  };

  const shouldRenderNavItems = !isCreateProjectPage && !isProjectPage;

  const menuItemsRender = menuItems.map((item) => {
    if (isProjectPage && item.url === '/') {
      return null;
    }

    return (
      <BaseHeader.Menu.Item key={item.name} disabled={item.disabled}>
        {(menuItemProps): React.ReactNode => {
          const itemText = <Text view={item.disabled ? 'ghost' : 'primary'}>{item.name}</Text>;

          if (!item.disabled && item.url !== undefined) {
            return (
              <Link
                onClick={menuItemProps.closeMenu}
                className={menuItemProps.className}
                to={item.url}
              >
                {itemText}
              </Link>
            );
          }

          return (
            <div className={cnHeader('MenuItem', { disabled: true }).mix(menuItemProps.className)}>
              {itemText}
              <Badge label="Скоро" view="filled" status="system" size="s" form="round" />
            </div>
          );
        }}
      </BaseHeader.Menu.Item>
    );
  });

  const cnHeaderMenu = cnHeader('Menu', { disabled: !shouldRenderNavItems });

  const menuTitle = title() ?? '';

  const renderMenu = isLoading ? (
    <Loader />
  ) : (
    <BaseHeader.Menu className={cnHeaderMenu} title={menuTitle}>
      {menuItemsRender}
      <BaseHeader.Menu.Delimiter />
      <BaseHeader.Menu.Item>
        {(menuItemProps): React.ReactNode => (
          <a
            onClick={(e) => {
              e.preventDefault();
              if (menuItemProps.closeMenu) {
                identity.logout();
                menuItemProps.closeMenu(e);
              }
            }}
            className={menuItemProps.className}
            href="/login"
          >
            <Text>Выйти</Text>
          </a>
        )}
      </BaseHeader.Menu.Item>
    </BaseHeader.Menu>
  );

  return (
    <BaseHeader>
      {renderMenu}
      {shouldRenderNavItems && (
        <BaseHeader.Nav
          activeItem={isActiveNavItem}
          navItems={navItems}
          onChangeItem={handleChangeActive}
        />
      )}
    </BaseHeader>
  );
};
