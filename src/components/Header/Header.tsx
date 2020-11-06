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
import { Badge, Text } from '@gpn-prototypes/vega-ui';
import cn from 'bem-cn';

import { BaseHeader, NavItemType } from '../BaseHeader';

import { useGetProjectName } from './__generated__/get-project-name';

import './Header.css';
import { Loader } from '@consta/uikit/Loader';

interface NavLinkType extends NavItemType {
  url?: string;
}

type Params = {
  // eslint-disable-next-line camelcase
  project_id?: string;
};

const cnHeader = cn('Header');

export const Header = (): React.ReactElement => {
  const history = useHistory();

  const location = useLocation();

  const navItems: NavLinkType[] = [
    { name: 'О проекте', url: '/show/:project_id' },
    { name: 'Ресурсная база', url: '/show/:project_id/rb' },
  ];

  const params = useParams<Params>();

  const { data, loading } = useGetProjectName({
    skip: !params.project_id,
    variables: { vid: params.project_id },
  });

  console.log(data)

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

  const menuItems = [{ name: 'Проекты', url: '/' }, { name: 'Обучение', disabled: true }, { name: 'Помощь', disabled: true }];

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

    if (data?.data?.__typename === 'Project' && typeof data.data.name === 'string') {
      return data.data.name;
    }

    return 'Вега';
  };

  const shouldRenderNavItems = !isExactCreateProjectPage && !isExactProjectsPage;

  const menuItemsRender = menuItems.map((item) => {
    if (isExactProjectsPage && item.url === '/') {
      return null;
    }


    return (
      <BaseHeader.Menu.Item key={item.name} disabled={item.disabled}>
        {(menuItemProps): React.ReactNode => {
          const itemText = <Text view={item.disabled ? 'ghost' : 'primary'}>{item.name}</Text>

          if (!item.disabled && item.url !== undefined) {
            return (
              <Link onClick={menuItemProps.closeMenu} className={menuItemProps.className} to={item.url}>
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

  console.log(loading, data)

  const renderMenu = loading ? <Loader /> : (
    <BaseHeader.Menu className={cnHeaderMenu} title={title()}>
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
  )

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
