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
  projectId?: string;
};

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
  const { projectName, onChangeActive, isCreateProjectPage, isLoading, isProjectPage, pathname } = props;

  const navItems: NavLinkType[] = [
    { name: 'О проекте', url: '/show/:projectId' },
    { name: 'Ресурсная база', url: '/show/:projectId/rb' },
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

export const Header = (): React.ReactElement => {
  const isProjectsPage = useRouteMatch('/');

  const history = useHistory();

  const location = useLocation();

  const params = useParams<Params>();

  const isExactProjectsPage = isProjectsPage && isProjectsPage.isExact;

  const isCreateProjectPage = useRouteMatch('/create');

  const isExactCreateProjectPage = isCreateProjectPage && isCreateProjectPage.isExact;

  const { data, loading } = useGetProjectName({
    skip: params.projectId === undefined,
    variables: { vid: params.projectId },
  });

  const getTitle = (): string | undefined | null => {
    if (data?.data?.__typename === 'Project') {
      return data.data.name;
    }

    return undefined;
  };

  const handleChangeActiveLink = (item: NavLinkType): void => {
    if (item.url && params.projectId !== undefined) {
      history.push(generatePath(item.url, { projectId: params.projectId }))
    }
  }

  return (
    <HeaderView
      pathname={location.pathname}
      onChangeActive={handleChangeActiveLink}
      projectName={getTitle()}
      isLoading={loading}
      isCreateProjectPage={isExactCreateProjectPage}
      isProjectPage={isExactProjectsPage}
    />
  );
};
