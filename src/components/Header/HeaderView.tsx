import React, { useMemo, useState } from 'react';
import { Link, matchPath } from 'react-router-dom';
import { Badge, Text, useMount } from '@gpn-prototypes/vega-ui';
import cn from 'bem-cn';

import { useAppContext } from '../../platform/app-context/AppContext';
import { BaseHeader } from '../BaseHeader';

import defaultAvatar from './default-avatar.svg';
import { NavLinkType } from './types';

export type HeaderViewProps = {
  projectName?: string | null;
  isLoading?: boolean;
  onChangeActive: (item: NavLinkType) => void;
  pathname: string;
};

const cnHeader = cn('Header');

const LS_USER_FIRST_NAME_KEY = 'user-first-name';
const LS_USER_LAST_NAME_KEY = 'user-last-name';

export const HeaderView = (props: HeaderViewProps): React.ReactElement => {
  const { projectName, onChangeActive, isLoading, pathname } = props;
  const { identity } = useAppContext();

  const [userName, setUserName] = useState<string | null>(null);

  useMount(() => {
    const userFirstName = localStorage.getItem(LS_USER_FIRST_NAME_KEY);
    const userLastName = localStorage.getItem(LS_USER_LAST_NAME_KEY);

    if (userFirstName && userLastName) {
      setUserName(`${userFirstName} ${userLastName}`);
    }
  });

  const renderAvatar = () => {
    if (userName) {
      return (
        <>
          <div className={cnHeader('Avatar')}>
            <img src={defaultAvatar} alt="avatar" className={cnHeader('Avatar-img')} />
            <Text size="xs" className={cnHeader('Avatar-name').toString()}>
              {userName}
            </Text>
          </div>
          <BaseHeader.Menu.Delimiter />
        </>
      );
    }

    return null;
  };

  const navItems: NavLinkType[] = [
    { name: 'О проекте', url: '/projects/show/:projectId' },
    { name: 'Ресурсная база', url: '/projects/show/:projectId/rb' },
    { name: 'Логика проекта', url: '/projects/show/:projectId/lc' },
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
    { name: 'Проекты', url: '/projects' },
    { name: 'Обучение', disabled: true },
    { name: 'Помощь', disabled: true },
  ];

  const handleChangeActive = (item: NavLinkType): void => {
    onChangeActive(item);
  };

  const [isCreateProjectPage, isProjectsPage] = ['/projects/create', '/projects'].map(
    (path) => matchPath(pathname, { path, exact: true }) !== null,
  );

  const title = (): string | null | undefined => {
    if (isCreateProjectPage) {
      return 'Создание проекта';
    }

    if (isProjectsPage) {
      return 'Проекты';
    }

    return projectName;
  };

  const shouldRenderNavItems = !isCreateProjectPage && !isProjectsPage;

  const menuItemsRender = menuItems.map((item) => {
    if (isProjectsPage && item.url === '/projects') {
      return null;
    }

    return (
      <BaseHeader.Menu.Item key={item.name} disabled={item.disabled}>
        {(menuItemProps): React.ReactNode => {
          const itemText = (
            <Text size="s" view={item.disabled ? 'ghost' : 'primary'}>
              {item.name}
            </Text>
          );

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

  const renderMenu = isLoading ? null : (
    <BaseHeader.Menu
      className={cnHeaderMenu}
      dropdownClassName={cnHeader('Dropdown')}
      title={menuTitle}
      pathname={pathname}
    >
      {renderAvatar()}
      <div className={cnHeader('MenuItems')}>{menuItemsRender}</div>
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
            <Text size="s">Выйти</Text>
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
