import React, { ReactElement } from 'react';
import { BrowserRouter, Link, useHistory } from 'react-router-dom';
import { Header, NavItemType, Root as VegaRoot, Text } from '@gpn-prototypes/vega-ui';

interface NavLinkType extends NavItemType {
  url?: string;
}

const VegaHeader = () => {
  const history = useHistory();

  const navItems: NavLinkType[] = [];

  const menuItems = [{ name: 'Проекты', url: '/projects' }];

  const activeItem = navItems.find((ni) => ni.isActive);

  const handleChangeActive = (item: NavLinkType): void => {
    if (item.url) {
      history.push(item.url);
    }
  };

  return (
    <Header>
      <Header.Menu title="Тестовый заголовок">
        {menuItems.map((menuItem) => (
          <Header.Menu.Item key={menuItem.name}>
            {(menuItemProps): React.ReactNode => (
              <Link
                onClick={menuItemProps.closeMenu}
                className={menuItemProps.className}
                to={menuItem.url}
              >
                <Text>{menuItem.name}</Text>
              </Link>
            )}
          </Header.Menu.Item>
        ))}
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
      <Header.Nav activeItem={activeItem} navItems={navItems} onChangeItem={handleChangeActive} />
    </Header>
  );
};

export const App = (): ReactElement => {
  return (
    <BrowserRouter basename="/">
      <VegaRoot defaultTheme="dark">
        <VegaHeader />
      </VegaRoot>
    </BrowserRouter>
  );
};
