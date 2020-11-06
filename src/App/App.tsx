import React, { ReactElement, useMemo } from 'react';
import {
  BrowserRouter,
  generatePath,
  Link,
  matchPath,
  Route,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import { Root as VegaRoot, Text } from '@gpn-prototypes/vega-ui';
import cn from 'bem-cn';

import { Header, NavItemType } from '../components/Header';

import './App.css';

interface NavLinkType extends NavItemType {
  url?: string;
}

type Params = {
  // eslint-disable-next-line camelcase
  project_id?: string;
};

const VegaHeader = () => {
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
      <Header.Menu.Item key={item.name}>
        {(menuItemProps): React.ReactNode => (
          <Link onClick={menuItemProps.closeMenu} className={menuItemProps.className} to={item.url}>
            <Text>{item.name}</Text>
          </Link>
        )}
      </Header.Menu.Item>
    );
  });

  return (
    <Header>
      <Header.Menu
        className={cn('App')('HeaderMenu', { disable: !shouldRenderNavItems })}
        title={title()}
      >
        {menuItemsRender}
        <Header.Menu.Delimiter />
        <Header.Menu.Item>
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
        </Header.Menu.Item>
      </Header.Menu>
      {shouldRenderNavItems && (
        <Header.Nav
          activeItem={isActiveNavItem}
          navItems={navItems}
          onChangeItem={handleChangeActive}
        />
      )}
    </Header>
  );
};

export const App = (): ReactElement => {
  return (
    <BrowserRouter basename="/projects">
      <Route
        path={['/show/:project_id', '/edit/:project_id', '/show/:project_id/rb', '/', '/create']}
      >
        <VegaRoot defaultTheme="dark">
          <VegaHeader />
        </VegaRoot>
      </Route>
    </BrowserRouter>
  );
};
