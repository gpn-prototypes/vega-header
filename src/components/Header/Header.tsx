import React, { useMemo } from 'react';
import {
  generatePath,
  Link,
  matchPath,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { Text } from '@gpn-prototypes/vega-ui';
import cn from 'bem-cn';

import { Header as BaseHeader, NavItemType } from '../BaseHeader';

import './Header.css';

interface NavLinkType extends NavItemType {
  url?: string;
}

type Params = {
  // eslint-disable-next-line camelcase
  project_id?: string;
};

export const Header = (): React.ReactElement => {
  const history = useHistory();

  const location = useLocation();

  const navItems: NavLinkType[] = [
    { name: 'О проекте', url: '/show/:project_id' },
    { name: 'Ресурсная база', url: '/show/:project_id/rb' },
  ];

  const params = useParams<Params>();

  const isProjectsPage = useRouteMatch('/');

  const isExactProjectsPage = isProjectsPage && isProjectsPage.isExact;

  const isCreateProjectPage = useRouteMatch('/create');

  const isExactCreateProjectPage = isCreateProjectPage && isCreateProjectPage.isExact;

  const isActiveNavItem = useMemo(() => {
    return navItems.find((item) => {
      const match = matchPath(location.pathname, {
        path: item.url,
        exact: true,
      });

      return match !== null;
    });
  }, [location.pathname, navItems]);

  const menuItems = [{ name: 'Проекты', url: '/' }];

  const handleChangeActive = (item: NavLinkType): void => {
    if (item.url) {
      history.push(generatePath(item.url, { project_id: params.project_id }));
    }
  };

  const title = (): string => {
    if (isExactCreateProjectPage) {
      return 'Создание проекта';
    }

    if (isExactProjectsPage) {
      return 'Проекты';
    }

    return 'Вега';
  };

  const shouldRenderNavItems = !isExactCreateProjectPage && !isExactProjectsPage;

  const menuItemsRender = menuItems.map((item) => {
    if (isExactProjectsPage && item.url === '/') {
      return null;
    }

    return (
      <BaseHeader.Menu.Item key={item.name}>
        {(menuItemProps): React.ReactNode => (
          <Link onClick={menuItemProps.closeMenu} className={menuItemProps.className} to={item.url}>
            <Text>{item.name}</Text>
          </Link>
        )}
      </BaseHeader.Menu.Item>
    );
  });

  const cnHeader = cn('Header')('Menu', { disable: !shouldRenderNavItems });
  return (
    <BaseHeader>
      <BaseHeader.Menu className={cnHeader} title={title()}>
        {menuItemsRender}
        <BaseHeader.Menu.Delimiter />
        <BaseHeader.Menu.Item>
          {(menuItemProps): React.ReactNode => (
            <Link
              onClick={(e) => {
                if (menuItemProps.closeMenu) {
                  localStorage.removeItem('auth-token');
                  menuItemProps.closeMenu(e);
                }
              }}
              className={menuItemProps.className}
              to="/login"
            >
              <Text>Выйти</Text>
            </Link>
          )}
        </BaseHeader.Menu.Item>
      </BaseHeader.Menu>
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
